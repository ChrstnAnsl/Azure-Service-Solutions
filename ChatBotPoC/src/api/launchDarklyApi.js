class LaunchDarklyApi {
    static url = "http://127.0.0.1:5000/api/v2/flag-statuses/test/test";
    static async getLdFlags() {
      const apiUrl = LaunchDarklyApi.url;
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.items.map(flag => flag.name);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    static async getStatusFromLd(name) {
      try {
        const response = await fetch(LaunchDarklyApi.url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          const flag = data.items.find(flag => flag.name === name);

          if (!flag) {
            throw new Error(`Flag with name ${name} not found`);
          }

          return flag.status;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  }

  module.exports = LaunchDarklyApi;
  