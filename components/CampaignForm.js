import React, { useState } from 'react';
import styles from '../styles/CampaignForm.module.scss';

const CampaignForm = ({ onSubmit }) => {
    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        targetAudience: '',
        budget: 0,
        points: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({
            ...campaign,
            [name]: name === 'budget' || name === 'points' ? parseInt(value, 10) : value
        });
    };

    const handlePointChange = (change) => {
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            points: Math.max(0, prevCampaign.points + change)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!campaign.name || !campaign.description) {
            alert('Lütfen isim ve açıklama yazınız.');
            return;
        }

        onSubmit(campaign);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.campaignForm}>
            <div className={styles.formHeader}>
                <input
                    type="text"
                    name="name"
                    placeholder="Başlık"
                    value={campaign.name}
                    onChange={handleChange}
                    className={styles.formControl}
                />
                <input
                    type="date"
                    name="startDate"
                    value={campaign.startDate}
                    onChange={handleChange}
                    className={styles.formControl}
                />
            </div>

            <div className={styles.formBody}>
                <textarea
                    name="description"
                    placeholder="Açıklama"
                    value={campaign.description}
                    onChange={handleChange}
                    className={styles.formControl}
                />
            </div>

            <div className={styles.formFooter}>
                <input
                    type="text"
                    name="targetAudience"
                    placeholder="Hedef Kitle"
                    value={campaign.targetAudience}
                    onChange={handleChange}
                    className={styles.formControl}
                />
                <div className={styles.pointStepper}>
                    <label htmlFor="points"></label>
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
                    type="text"
                    name="budget"
                    placeholder="Bütçe"
                    value={campaign.budget === 0 ? '' : campaign.budget}
                    onChange={handleChange}
                    className={styles.formControl}
                />
            </div>

            <button type="submit" className={styles.submitButton}>Kampanya Yarat</button>
        </form>
    );
};

export default CampaignForm;
