# Octofit Tracker Backend

## API base

- Local API: `http://localhost:8000/api`

## Quick seed endpoints

Run these after starting the backend server:

```bash
curl -X POST http://localhost:8000/api/users/seed
curl -X POST http://localhost:8000/api/teams/seed
curl -X POST http://localhost:8000/api/activities/seed
curl -X POST http://localhost:8000/api/leaderboard/seed
curl -X POST http://localhost:8000/api/workouts/seed
```

## List endpoints

```bash
curl http://localhost:8000/api/users
curl http://localhost:8000/api/teams
curl http://localhost:8000/api/activities
curl http://localhost:8000/api/leaderboard
curl http://localhost:8000/api/workouts
```
