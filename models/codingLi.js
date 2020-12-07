const fetch = require('node-fetch');

(async () => {
  const where = encodeURIComponent(JSON.stringify({
    "ProgrammingLanguage": {
      "exists": true
    }
  }));
  const response = await fetch(
    `https://parseapi.back4app.com/classes/All_Programming_Languages?limit=20&order=ProgrammingLanguage&keys=ProgrammingLanguage&where=${where}`,
    {
      headers: {
        'X-Parse-Application-Id': 'XpRShKqJcxlqE5EQKs4bmSkozac44osKifZvLXCL', // This is the fake app's application id
        'X-Parse-Master-Key': 'Mr2UIBiCImScFbbCLndBv8qPRUKwBAq27plwXVuv', // This is the fake app's readonly master key
      }
    }
  );
  const data = await response.json(); // Here you have the data that you need
  console.log(JSON.stringify(data, null, 2));
})();