import React, { useState, useEffect } from 'react';
import styles from '../styles/CampaignList.module.scss'; 
import CampaignEditForm from './CampaignEditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // 'faSignOut' alternatifi


const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [expandedCampaignId, setExpandedCampaignId] = useState(null);

    useEffect(() => {
        const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(storedCampaigns);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('campaignAdded')) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 2000);
            localStorage.removeItem('campaignAdded');
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleEditForm = (campaignId) => {
        if (expandedCampaignId === campaignId) {
            setExpandedCampaignId(null);
        } else {
            setExpandedCampaignId(campaignId);
        }
    };

    const handleUpdate = (updatedCampaign) => {
        const updatedCampaigns = campaigns.map(c => 
            c.id === updatedCampaign.id ? updatedCampaign : c
        );
        setCampaigns(updatedCampaigns);
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
        toggleEditForm(null); // Close the form after update
    };

    const handleDelete = (campaignId) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
            setCampaigns(updatedCampaigns);
            localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
        }
    };

    const filteredCampaigns = campaigns.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.campaignList}>
            {showSuccessMessage && <p className={styles.successMessage}>Campaign successfully added!</p>}
            <input
                type="text"
                placeholder="Search campaigns"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <div className={styles.listContainer}>
                {filteredCampaigns.map(campaign => (
                    <div key={campaign.id} className={styles.campaignItem}>
                        <h3>{campaign.name}</h3>
                        <div className={styles.campaignActions}>
                            <button onClick={() => handleDelete(campaign.id)}> <FontAwesomeIcon icon={faTrash} size="lg" /> </button>
                            <button onClick={() => toggleEditForm(campaign.id)}><FontAwesomeIcon icon={faPenToSquare} /> </button>
                        </div>
                        {expandedCampaignId === campaign.id && (
                            <CampaignEditForm 
                                campaignData={campaign} 
                                onSubmit={handleUpdate}
                                onClose={() => toggleEditForm(null)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignList;
