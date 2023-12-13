const launchDarklyFlagCard = require("./adaptiveCards/checkLaunchDarklyFlag.json");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { CardFactory, MessageFactory } = require("botbuilder");
const LaunchDarklyApi = require("./api/launchDarklyApi");

class CheckLaunchDarklyFlagStatusCommandHandler {

   constructor() {
    this.initializeArrays();
  }
  
  async initializeArrays() {
    this.myArrays = await LaunchDarklyApi.getLdFlags();
    this.triggerPatterns = this.myArrays.map(element => `Status of LD ${element}`);
    
  }
  
  async handleCommandReceived(context, message) {
    console.log(`App received message: ${message.text}`);

    const content = context._activity.text.split(' ');
    const ldFlagName = content[content.length - 1];
    let status = await LaunchDarklyApi.getStatusFromLd(ldFlagName);
    if (status == "enabled") {
      status = "ON";
    } else {
      status = "OFF";
    }

    const cardData = {
      title: `App is Running on Launch Darkly ${ldFlagName}`,
      body: `The status of LD ${ldFlagName} is ${status}`,
    };

    const cardJson = AdaptiveCards.declare(launchDarklyFlagCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  
  }
}

module.exports = {
  CheckLaunchDarklyFlagStatusCommandHandler,
};

