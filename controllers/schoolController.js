const School = require('../models/School');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => value * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const school = await School.create({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully', id: school.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and Longitude required' });
    }

    const schools = await School.findAll();
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
