const launchDarklyFlagCard = require("./adaptiveCards/checkLaunchDarklyFlag.json");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { CardFactory, MessageFactory } = require("botbuilder");
const LaunchDarklyApi = require("./api/launchDarklyApi");

class UpdateLaunchDarklyFlagStatusCommandHandler {
  constructor() {
    this.initializeArrays();
  }
  
  async initializeArrays() {
    this.myArrays = await LaunchDarklyApi.getLdFlags();
    this.triggerPatterns = [
        ...this.myArrays.map(element => `Turn ON LD ${element}`),
        ...this.myArrays.map(element => `Turn OFF LD ${element}`),

      ];
  }
  
  async handleCommandReceived(context, message) {
    console.log(`App received message: ${message.text}`);

    const content = context._activity.text.split(' ');
    const ldFlagName = content[content.length - 1];
    const data = message.text;
    let status; 

    if (data.includes("turn off")) {
        status = "OFF";
    } else {
        status = "ON";
    }

    const cardData = {
      title: `App is Updating Launch Darkly ${ldFlagName}`,
      body: `The LD ${ldFlagName} is now ${status}`,
    };

    const cardJson = AdaptiveCards.declare(launchDarklyFlagCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  
  }
}

module.exports = {
    UpdateLaunchDarklyFlagStatusCommandHandler,
};
