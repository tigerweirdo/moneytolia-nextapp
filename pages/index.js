import React, { useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "../styles/HomePage.module.scss"; 
import { Auth } from '../components/Auth';
const HomePage = () => {
 const [activeComponent, setActiveComponent] = useState("list"); 

 const handleFormSubmit = (campaignData) => {
    console.log("Form Submitted", campaignData); 

    const existingCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    const newCampaign = { ...campaignData, id: Date.now(), points: 0 };
    console.log("New Campaign", newCampaign); 

    const updatedCampaigns = [...existingCampaigns, newCampaign];
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

    localStorage.setItem("campaignAdded", "true"); 

   
    setTimeout(() => {
      localStorage.removeItem("campaignAdded"); 
    }, 2000);
    setActiveComponent("list");
 };

 return (
    <div>
      <Header />
      <div className={styles.homePage}>
        <Sidebar
          changeComponent={setActiveComponent}
          className={`${styles.sidebar} ${
            activeComponent === "list" ? styles.activeSidebar : ""
          }`}
        />
        <main className={styles.mainContent}>
          {activeComponent === "list" && <CampaignList />}
          {activeComponent === "create" && (
            <section className={styles.createCampaignSection}>
              <CampaignForm onSubmit={handleFormSubmit} />
            </section>
          )}
        </main>
      </div>
    </div>
 );
};

export default Auth(HomePage);