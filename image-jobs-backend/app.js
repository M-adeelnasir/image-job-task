const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const jobFilePath = './jobs.json';

function loadJobs() {
    if (fs.existsSync(jobFilePath)) {
        try {
            const fileContent = fs.readFileSync(jobFilePath, 'utf8');
            return fileContent.trim() ? JSON.parse(fileContent) : {};
        } catch (error) {
            console.error('Error reading or parsing jobs.json:', error.message);
            return {};
        }
    }
    return {};
}

function saveJobs() {
    fs.writeFileSync(jobFilePath, JSON.stringify(jobs, null, 2));
}

const jobs = loadJobs();

async function fetchUnsplashImage(retries = 3) {
    const accessKey = 'rLqFeAm55uoFpK0epcEgb-WwxvlpQvVMsSzd3iZdOvQ';
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: { query: 'food' },
            headers: { Authorization: `Client-ID ${accessKey}` },
        });
        return response.data.urls.regular;
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${3 - retries + 1})`);
            return fetchUnsplashImage(retries - 1);
        }
        throw error;
    }
}

function simulateJobExecution(jobId) {
    const executionTime = Math.floor(Math.random() * 12) * 5 + 5;

    setTimeout(async () => {
        try {
            const imageUrl = await fetchUnsplashImage();
            jobs[jobId].status = 'resolved';
            jobs[jobId].result = imageUrl;
        } catch (error) {
            jobs[jobId].status = 'failed';
            jobs[jobId].error = error.message;
            console.error('Error fetching image:', error.response?.data || error.message);
        } finally {
            saveJobs();
        }
    }, executionTime * 1000);
}

app.post('/jobs', (req, res) => {
    const jobId = uuidv4();
    jobs[jobId] = { status: 'pending', result: null };
    saveJobs();

    simulateJobExecution(jobId);
    res.status(201).json({ jobId });
});

app.get('/jobs', (req, res) => {
    const jobList = Object.entries(jobs).map(([id, job]) => ({
        id,
        status: job.status,
        result: job.status === 'resolved' ? job.result : null,
    }));
    res.json(jobList);
});

app.get('/jobs/:id', (req, res) => {
    const jobId = req.params.id;
    const job = jobs[jobId];

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
        id: jobId,
        status: job.status,
        result: job.status === 'resolved' ? job.result : null,
    });
});

app.listen(port, () => {
    console.log(`Job service backend is running on http://localhost:${port}`);
});
