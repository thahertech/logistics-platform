# 🚚 Deliveries Dashboard

Next.js application designed for managing and filtering delivery records sourced from a WordPress backend. This application allows users to create, view, filter & fetch detailed information about available deliveries and purchase them.

---

## 📋 Table of Contents

- [Features](#features)
- [Images](#images)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## ⭐ Features

- **Delivery Management**: View and manage deliveries from a WordPress REST API.
- **Dynamic Filtering**: Filter deliveries by pickup location, delivery location, price, date, and transport type.
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Informative Sections**: Learn about the company and its mission in the "About Us" section.
- **Contact Us**: Easy access to reach out for inquiries or support.

---

## Images
<img src="https://github.com/user-attachments/assets/52486dc8-97bd-41d1-9313-31b4c7e1f304" width="100%">
<img width="1440" alt="Screenshot 2024-09-29 at 18 11 08" src="https://github.com/user-attachments/assets/80799950-9f9a-46ff-bf39-503ab0d7abf8">
<img width="1440" alt="Screenshot 2024-09-29 at 18 11 21" src="https://github.com/user-attachments/assets/321abe88-324c-4553-9b3c-d54419a3a3e6">
<img width="1440" alt="Screenshot 2024-09-29 at 18 12 59" src="https://github.com/user-attachments/assets/f3cead58-44cb-431c-81eb-2c784b13e01f">
<img width="1440" alt="Screenshot 2024-09-29 at 18 12 44" src="https://github.com/user-attachments/assets/1331c3d6-5880-4d90-a152-4240d0a6e53b">

---

## ⚙️ Technologies Used

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **WordPress REST API**: For backend data management.

---

## 📥 Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
  ```bash
   git clone https://github.com/yourusername/deliveries-dashboard.git
   cd deliveries-dashboard
```
2. **Install dependencies:**
  ```bash
  npm install
  ```

Set up your WordPress backend (ensure it runs locally at http://truckup.local or adjust the API endpoint in the code).

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

## 💻 Usage
Home Dashboard: Users can navigate to different features such as viewing nearby deliveries, creating shipments, and finding available deliveries.
Filtering Deliveries: Utilize the filter sidebar to narrow down delivery options based on various criteria.
About Us: Learn more about the company, its mission, and values.

## 🧩 Components
AboutUs
Provides an overview of the company, detailing who we are, our mission, values, and contact information. All the basics, u know!

Dashboard
The main interface where users can interact with various delivery services, navigate to different sections, and view fun facts about the company.

FilterSidebar
Allows users to filter deliveries based on pickup and delivery locations, price, date, and transport type through a user-friendly interface.

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create your feature branch:
```bash
git checkout -b feature/YourFeature
```
Commit your changes:
```bash
git commit -m 'Add some feature'
```
Push to the branch:
```bash
git push origin feature/YourFeature
```

Open a pull request.

## 📝 License

This project is licensed under a custom license that prohibits commercial use. Please do not use, modify, or distribute this software for commercial purposes without explicit permission.

## 🙏 Acknowledgements

Next.js
Axios
Tailwind CSS
WordPress
