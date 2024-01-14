import React, { useState } from "react";
import CampaignForm from "../../components/CampaignForm";
import CampaignList from "../../components/CampaignList";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import styles from "../../styles/HomePage.module.scss"; // Özelleştirilmiş CSS/SCSS modülü

const HomePage = () => {
 const [activeComponent, setActiveComponent] = useState("list"); // 'list' or 'create'
 const [showSuccessMessage, setShowSuccessMessage] = useState(false);

 const handleFormSubmit = (campaignData) => {
    console.log("Form Submitted", campaignData); // Debug log

    const existingCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    const newCampaign = { ...campaignData, id: Date.now(), points: 0 };
    console.log("New Campaign", newCampaign); // Debug log

    const updatedCampaigns = [...existingCampaigns, newCampaign];
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

    localStorage.setItem("campaignAdded", "true"); // Başarılı gönderim işaretleyici

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      localStorage.removeItem("campaignAdded"); // Reset the flag after the message is shown
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

export default HomePage;