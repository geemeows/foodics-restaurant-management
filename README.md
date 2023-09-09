### 📦 References
📌 **Task Description:** [Restaurant Reservation System](https://foodics.notion.site/foodics/Restaurant-Reservation-System-590ff5162e3c42ac97c5106026e00bb0)
🎨 **Design Link:** [Restaurant Reservation System](https://foodics.notion.site/foodics/Restaurant-Reservation-System-590ff5162e3c42ac97c5106026e00bb0)
🚀 **Deployed Link:** N/A

### 📖 Repo Context
This repo contains an implementation for the requirements mentioned in the link above. I've used `vite`, `vue@3`, `tailwind`, `@headlessui/vue`, and `@heroicons/vue` to 
implement this project. The project mainly contains the following features:
- Getting the branches that have reservation open
- Add the disabled branches to the service and enable the reservation for them
- Disable all the reservation in all branches

### 🧪 Automation Tests:
I've added some basic automation tests as a proof of concept that you can find them under `/cypress` directory.

### 📝 Notes:
- Edit branch functionality is not implemented
- Added some enhancements to the UX to make things go smooth while the user is using the app (like loading state, empty state, ...etc)
- If you want to run the e2e test, the project should be served via vite first

### 🙋🏻 Points to discuss:
- Proxying the backend (via Nginx or CORS anywhere)
- Bulk update resources

### ▶️ Running the project
First, we need to install the dependencies via `yarn` command then
```
yarn dev
```

### 🧪 Running Cypress
The project should be served via `vite` as mentioned above, then we run the following command
```
yarn e2e
```

