import Delivery from '../models/Delivery.js';

// Get current delivery for the logged-in user
export const getDeliveryInfo = async (req, res) => {
    try {
        const delivery = await Delivery.findOne({ userId: req.user.id });

        if (!delivery) {
            return res.status(404).json({ message: 'No delivery info found' });
        }

        res.json(delivery);
    } catch (error) {
        console.error('Error fetching delivery info:', error);
        res.status(500).json({ message: 'Server error while fetching delivery info' });
    }
};

// Create or update delivery (for test/demo/admin purposes)
export const createOrUpdateDelivery = async (req, res) => {
    const {
        status, courier, contact, eta, updates, timeline, location
    } = req.body;

    try {
        let delivery = await Delivery.findOne({ userId: req.user.id });

        if (delivery) {
            // Update existing
            delivery.status = status;
            delivery.courier = courier;
            delivery.contact = contact;
            delivery.eta = eta;
            delivery.updates = updates;
            delivery.timeline = timeline;
            delivery.location = location;
            await delivery.save();

            return res.json({ message: 'Delivery updated', delivery });
        }

        // Create new
        delivery = new Delivery({
            userId: req.user.id,
            status,
            courier,
            contact,
            eta,
            updates,
            timeline,
            location
        });

        await delivery.save();
        res.status(201).json({ message: 'Delivery created', delivery });
    } catch (error) {
        console.error('Error saving delivery:', error);
        res.status(500).json({ message: 'Server error while saving delivery info' });
    }
};
