var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.WRITE_KEY);


module.exports = {
	sentAnalytic: function(data,config,provider){
		var newData = massage(data,config,provider);
		sentData(newData);
		return newData;
	}
};

function massage(data,config,provider){
	//rename entries to our segment format
	var newData = {
		repository_id : '',
		target_runtimes : '',
		target_services : '',
		event_id : '',
		deploy_to_bluemix : '',
		date_deployed : '',
		event_organizer: ''
	};
	newData.cfMetric = data;
	try{
		if(config){
			if(config.repository_id) newData.repository_id = config.repository_id;
			if(config.target_runtimes) newData.target_runtimes = config.target_runtimes;
			if(config.target_services) newData.target_services = config.target_services;
			if(config.event_id) newData.event_id = config.event_id;
			if(config.deploy_to_bluemix) newData.deploy_to_bluemix = config.deploy_to_bluemix;
			if(config.event_organizer) newData.event_organizer = config.event_organizer;
			if(provider) newData.provider = provider;
		}
		if(data.date_sent) newData.date_deployed = data.date_sent;
	}catch(ex){
		console.log("repository.config is not parsed or causing error");
	}
	return newData;
}

//Sent data to Segment
function sentData(data){
  var id = 'Unknown';
  if(data.cfMetric.space_id) id = data.cfMetric.space_id;
  analytics.track({
    userId: id,
    event: 'Created Project',
    properties: data
  });
 }