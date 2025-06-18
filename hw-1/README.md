# Habit Tracker CLI

## Installation
```bash
git clone https://github.com/it-bulka/node-microservices-test
cd hw-1
npm install
```

## Start
```
node index.js <command> [options]
```
## Commands list:
### Commands

| Command                                                                                     | Description                                |
|---------------------------------------------------------------------------------------------|--------------------------------------------|
| `add --name "<text>" --freq daily\|weekly\|monthly`                                         | Add a new habit                            |
| `list`                                                                                      | Display all habits in a table              |
| `done --id <habitId>`                                                                       | Mark the habit as done **today**           |
| `stats`                                                                                     | Show completion percentage for 7 (30) days |
| `delete --id <habitId>`                                                                     | Delete a habit                             |
| `update --id <habitId> --name "<new name>" --freq daily\|weekly\|monthly`                   | Update habit name or frequency             |

## Environment Variable: `DAY_OFFSET`

Controls the “virtual today” date for testing:

| Value         | Meaning   |
|---------------|-----------|
| `0` or `none` | Today     |
| `1`           | Tomorrow  |
| `2`           | Day after |
|               | etc       |

### Usage:

```bash
DAY_OFFSET=2 node index.js list
```

