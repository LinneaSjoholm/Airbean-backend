import { menu } from '../config/data.js'
import { campaignDb } from '../config/db.js'

// Funktion för att lägg till en kampanj
async function addCampaignOffer(req, res) {

    // Destrukturera title, desc och discount från req.body
    const { title, desc, price, discount } = req.body;

    // Hitta produkten i menyn {menu - data.js}
    const product = menu.find(item => item.title === title);

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    
    // Skapa ett kampanjobjekt
    const campaign = { title, desc, price, discount };

    // Försök att lägga till kampanjen i databasen {campaign.db}
try {
    const newCampaign = await campaignDb.insert(campaign);

    // Skicka en 201-status och ett svar med kampanjens information
    const response = {
        message: 'Campaign added successfully',
        title: newCampaign.title,
        desc : newCampaign.desc,
        price: newCampaign.price,
        discount: `${newCampaign.discount}%`,
    };
    res.status(201).json(response);

    } catch (error) {
        res.status(400).json({ error: 'Failed to add campaign' });
    }
};

export { addCampaignOffer };
    

        