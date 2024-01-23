import React, { useState, useEffect } from 'react';
import styles from '../styles/CampaignList.module.scss'; 
import CampaignForm from './CampaignForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons';


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
            setTimeout(() => setShowSuccessMessage(false), 3000);
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
        toggleEditForm(null);
    };

    const handleDelete = (campaignId) => {
        if (window.confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
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
            {showSuccessMessage && <p className={styles.successMessage}>Kampanya eklendi!</p>}
            <input
                type="text"
                placeholder="Ara"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <div className={styles.listContainer}>
                {filteredCampaigns.map(campaign => (
                    <div key={campaign.id} className={styles.campaignItem}>
                        <h3>{campaign.name}</h3>
                        <div className={styles.campaignActions}>
                            <button onClick={() => handleDelete(campaign.id)}> <FontAwesomeIcon icon={faTrash} /> </button>
                            <button onClick={() => toggleEditForm(campaign.id)}><FontAwesomeIcon icon={faPenToSquare} /> </button>
                        </div>
                        {expandedCampaignId === campaign.id && (
                            <CampaignForm 
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
