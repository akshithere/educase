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

    // Basic validation
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).json({ message: 'Invalid latitude or longitude values' });
    }

    const school = await School.create({ name, address, latitude: lat, longitude: lon });
    res.status(201).json({ message: 'School added successfully', id: school.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!latitude || !longitude || isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: 'Valid latitude and longitude query params are required' });
    }

    const schools = await School.findAll();
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(lat, lon, school.latitude, school.longitude);
      return { ...school.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.healthCheck = (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy, it may take some time because it is deploye on the free instance of render.com and it takes some time to spin up the instance' });
};
