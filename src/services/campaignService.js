import { menu } from '../config/data.js'
import { campaignDb } from '../config/db.js'

// Lägg till en kampanj
async function addCampaignOffer(req, res) {
    const { title, desc, discount } = req.body;
    const product = menu.find(item => item.title === title);

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    const campaign = { title, desc, discount };

try {
    const newCampaign = await campaignDb.insert(campaign);

    const response = {
        message: 'Campaign added successfully',
        title: newCampaign.title,
        desc : newCampaign.desc,
        discount: `${newCampaign.discount}%`,
    };
    res.status(201).json(response);

    } catch (error) {
        res.status(400).json({ error: 'Failed to add campaign' });
    }
};

export { addCampaignOffer };
    

        