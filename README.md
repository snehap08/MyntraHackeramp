# Myntra Pro

![Project Logo](frontend/public/myntralogo.png)

Welcome to Myntra Pro, a comprehensive platform dedicated to revolutionizing your fashion experience. Whether you're seeking designer outfits, sustainable fashion items, or personalized advice from influencers, Myntra Pro has it all. Dive into the world of fashion innovation with us!

## Features

- **Designer Outfits with Collaborations**: Explore curated collections from renowned designers.
- **Sustainable Fashion Items**: Discover eco-friendly and sustainable fashion choices.
- **Chatbox with Designers**: Directly interact with designers for personalized fashion advice.
- **Guidance from Influencers to Gen-Z**: Stay updated with the latest trends and tips from fashion influencers.

## Screenshots

![Home Page](frontend/public/Screenshot%20(18).png)
![Designer Outfits](frontend/public/Screenshot%20(19).png)
![Designer Outfits](frontend/public/Screenshot%20(20).png)
![Designer Outfits](frontend/public/Screenshot%20(21).png)
![Designer Outfits](frontend/public/Screenshot%20(22).png)
![Designer Outfits](frontend/public/Screenshot%20(23).png)
![Designer Outfits](frontend/public/Screenshot%20(24).png)
![Designer Outfits](frontend/public/Screenshot%20(25).png)
![Designer Outfits](frontend/public/Screenshot%20(28).png)
![Sustainable](frontend/public/Screenshot%20(29).png)
![Sustainable_Products](frontend/public/Screenshot%20(30).png)
![Influencers](frontend/public/Screenshot%20(31).png)


## Getting Started

To run the Myntra Pro project locally, follow these steps:

1. **Clone the repository**

2. **Install dependencies:**
npm install
cd client
npm install
cd ..

3. **Set Up Environment Variables**
Create a .env file in the root directory and add the following variables:

Copy code
PORT=3000  # Main server port
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
DESIGNER_PORT=3001  # Designer service port
INFLUENCER_PORT=3002  # Influencer service port
BACKEND_PORT=5000  # Backend server port


4. **Run the Servers**
Open multiple terminal windows or tabs to run each server:

Main Server (Frontend)

Copy code
npm run dev
This will run the main server on http://localhost:3000.

Designer Service

Copy code
cd designer
npm start
This will run the designer service on http://localhost:3001.

Influencer Service

Copy code
cd influencer
npm start
This will run the influencer service on http://localhost:3002.

Backend Server

Copy code
cd backend
npm start
This will run the backend server on http://localhost:5000.

**Run Test Scripts**
To run the test scripts, navigate to the test directory, activate the virtual environment, and run the Python script:

Copy code
cd test
cd venv
python app.py
Open Your Browser
Navigate to http://localhost:3000 to view the project.

5. **Open your browser:**
Navigate to `http://localhost:3000` to view the project.

## Contributing

We welcome contributions and feedback. Please feel free to submit pull requests or reach out with any ideas or issues.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
