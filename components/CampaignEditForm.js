import React, { useState, useEffect } from 'react';
import styles from '../styles/CampaignEditForm.module.scss';

const CampaignEditForm = ({ campaignData, onSubmit, onClose }) => {
    const [campaign, setCampaign] = useState(campaignData);

    useEffect(() => {
        setCampaign(campaignData);
    }, [campaignData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({
            ...campaign,
            [name]: (name === 'budget' || name === 'points') ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(campaign);
    };
    const handlePointChange = (change) => {
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            points: Math.max(0, prevCampaign.points + change)
        }));
    };

    // Artık modal kontrolünü kaldırdık
    return (
        <div className={styles.modalDrawer}> {/* Stil ismi modalDrawer olmasına rağmen, artık modal değil */}
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <form onSubmit={handleSubmit} className={styles.campaignForm}>
                    <div className={styles.formHeader}>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Başlık" // Create formdaki gibi placeholder eklendi
                            value={campaign.name}
                            onChange={handleChange}
                            className={styles.formControl}
                        />
                        <input
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={campaign.startDate}
                            onChange={handleChange}
                            className={styles.formControl}
                        />
                    </div>

                    <div className={styles.formBody}>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Açıklama" // Create formdaki gibi placeholder eklendi
                            value={campaign.description}
                            onChange={handleChange}
                            className={styles.formControl}
                        />
                    </div>

                    <div className={styles.formFooter}>
                        <input
                            id="targetAudience"
                            type="text"
                            name="targetAudience"
                            placeholder="Hedef Kitle" // Create formdaki gibi placeholder eklendi
                            value={campaign.targetAudience}
                            onChange={handleChange}
                            className={styles.formControl}
                        />
                      <div className={styles.pointStepper}>
                    <label htmlFor="points">Puan</label>
                    <button type="button" onClick={() => handlePointChange(-1)}>-</button>
                    <input
                        type="text"
                        name="points"
                        readOnly
                        value={campaign.points}
                        className={styles.pointDisplay}
                    />
                    <button type="button" onClick={() => handlePointChange(1)}>+</button>
                </div>
                        <input
                            id="budget"
                            type="number"
                            name="budget"
                            placeholder="Bütçe" // Placeholder eklendi
                            value={campaign.budget === 0 ? '' : campaign.budget}
                            onChange={handleChange}
                            className={styles.formControl}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Kampanya Güncelle</button>
                </form>
            </div>
        </div>
    );
};

export default CampaignEditForm;
