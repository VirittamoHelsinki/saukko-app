# **Saukko (StadinAO)**


![DEVELOPMENT](https://img.shields.io/badge/STAGING-3d72a8)
[![STAGING website status](https://img.shields.io/website?url=https%3A//saukko-dev-app-cf2pynvwyijf4.azurewebsites.net)](https://saukko-dev-app-cf2pynvwyijf4.azurewebsites.net)
[![Build and deploy Node.js app to Azure Web App - saukko-dev-app-cf2pynvwyijf4](https://github.com/VirittamoHelsinki/saukko-app/actions/workflows/ci-update-env_saukko-dev-app-cf2pynvwyijf4.yml/badge.svg)](https://github.com/VirittamoHelsinki/saukko-app/actions/workflows/ci-update-env_saukko-dev-app-cf2pynvwyijf4.yml)

![PRODUCTION](https://img.shields.io/badge/PRODUCTION-8A2BE2)
[![PRODUCTION website status](https://img.shields.io/website?url=https%3A//saukko-prod-app-pppoz4ij7jaqc.azurewebsites.net)](https://saukko-prod-app-pppoz4ij7jaqc.azurewebsites.net)
[![Build and deploy Node.js app to Azure Web App - saukko-prod-app-pppoz4ij7jaqc](https://github.com/VirittamoHelsinki/saukko-app/actions/workflows/main_saukko-prod-app-pppoz4ij7jaqc.yml/badge.svg)](https://github.com/VirittamoHelsinki/saukko-app/actions/workflows/main_saukko-prod-app-pppoz4ij7jaqc.yml)


Saukko is an innovative platform designed to empower working professionals in completing their degrees while balancing their work commitments. The platform offers a flexible and efficient way for users to demonstrate their competence in various areas of study and earn their desired degrees.

With Saukko, users have the freedom to learn and progress at their own pace, fitting their educational journey seamlessly into their work schedules. The platform utilizes a unique system where users can check off different demonstrations of competence, representing their acquired knowledge and skills in specific subjects.
<br><br>

![Repo Preview Image](./repo-preview-img.webp "preview image")

## **Key Features of Saukko**

1. Flexible Degree Completion: Users can progress through their degree programs at their own pace, allowing them to balance their studies with their professional commitments.

2. Competency-based Approach: The platform focuses on demonstrations of competence, enabling users to showcase their skills and knowledge effectively.

3. Extensive Competency Catalog: A wide range of competencies will be available, covering various subjects and disciplines, providing users with diverse learning opportunities.

4. Expert Assessment: Teachers and subject matter experts will review users' progress and provide valuable feedback to ensure the quality and validity of the degree.

5. User-Friendly Interface: Saukko offers an intuitive and easy-to-use interface, ensuring a seamless experience for users to navigate, submit work, and interact with the platform.

Saukko revolutionizes the traditional approach to earning degrees by offering working professionals a flexible and efficient pathway to complete their education while advancing their careers. It empowers individuals to take control of their learning journey, achieve their academic goals, and unlock new opportunities for personal and professional growth.

## **Data**
1. [ePerusteet](https://eperusteet.opintopolku.fi/eperusteet-service)
   Interface description of the national criteria

## **Technologies**
* UI
  - [ React ](https://react.dev/)
  - [ MUI ](https://mui.com/)
  - [ Zustand ](https://zustand-demo.pmnd.rs/)
  - [ iconify ](https://iconify.design/)
  - [ uuid ](https://www.npmjs.com/package/uuid)
  - [ axios ](https://axios-http.com/docs/intro)
  - [ react-router-dom ](https://reactrouter.com/en/main)

* Prototype
  - [ Figma ](https://www.figma.com/)
  - [ Miro ](https://miro.com)

* Backend
  - [ Node.js ](https://nodejs.org/en)
  - [ Express.js ](https://expressjs.com/)
  - [ Mongoose ](https://www.npmjs.com/package/mongoose)
  - [ JWT ](https://jwt.io/)
  - [ MongoDB ](https://www.mongodb.com/)

* Infrastructure
  - [ OsTu App infrastructure ](https://virittamohelsinki.github.io/saukko-app/)




## **Initital Setup**

```sh
git clone https://github.com/VirittamoHelsinki/saukko-app.git

cd saukko-app

# Install all dependencies simultaneously for the front-end, back-end, and root
npm run setup 

# run the project's back-end and front-end simultaneously in development mode
npm run start:dev
```

When running on a local machine, open **[http://localhost:5173](http://localhost:5173)** in your browser to view the app.

The page will reload when you make changes.\
You may also see any lint errors in the console.
