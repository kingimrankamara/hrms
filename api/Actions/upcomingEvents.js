const Event = require('../Modules/event');

const getUpcomingEvents = async () => {
  const currentTime = new Date();
  const nextHour = new Date(currentTime.getTime() + (60 * 60 * 1000));

  const upcomingEvents = await Event.find({
    startTime: { $gte: currentTime, $lt: nextHour }
  });

  console.log(upcomingEvents);
};

const checkForUpcomingEvents = () => {
  setInterval(getUpcomingEvents, 60 * 60 * 1000);
};

module.exports = checkForUpcomingEvents;
