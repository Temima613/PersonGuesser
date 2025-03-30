document.addEventListener("DOMContentLoaded", function () {
    const predictButton = document.getElementById("predictBtn");
    const nameInput = document.getElementById("nameInput");
    const genderResult = document.getElementById("genderResult");
    const ageResult = document.getElementById("ageResult");
    const nationalityResult = document.getElementById("nationalityResult");

    // Function to fetch data from Gender API
    const getGender = async (name) => {
        try {
            const response = await fetch(`https://api.genderize.io?name=${name}`);
            if (!response.ok) {
                throw new Error('Failed to fetch gender data');
            }
            const data = await response.json();
            return data.gender ? data.gender : "Not Available";
        } catch (error) {
            console.error(error);
            return "Error fetching gender data";
        }
    };

    // Function to fetch data from Age API
    const getAge = async (name) => {
        try {
            const response = await fetch(`https://api.agify.io?name=${name}`);
            if (!response.ok) {
                throw new Error('Failed to fetch age data');
            }
            const data = await response.json();
            return data.age ? data.age : "Not Available";
        } catch (error) {
            console.error(error);
            return "Error fetching age data";
        }
    };

    // Function to fetch data from Nationality API
    const getNationality = async (name) => {
        try {
            const response = await fetch(`https://api.nationalize.io?name=${name}`);
            if (!response.ok) {
                throw new Error('Failed to fetch nationality data');
            }
            const data = await response.json();
            return data.country ? data.country[0].country_id : "Not Available";
        } catch (error) {
            console.error(error);
            return "Error fetching nationality data";
        }
    };

    // Function to display results
    const displayResults = async (name) => {
        if (!name.trim()) {
            alert("Please enter a valid name!");
            return;
        }

        // Show loading message
        genderResult.innerHTML = "<strong>Gender:</strong> Loading...";
        ageResult.innerHTML = "<strong>Age:</strong> Loading...";
        nationalityResult.innerHTML = "<strong>Nationality:</strong> Loading...";

        // Fetch data from the APIs concurrently
        const gender = await getGender(name);
        const age = await getAge(name);
        const nationality = await getNationality(name);

        // Update the UI with the results
        genderResult.innerHTML = `<strong>Gender:</strong> ${gender}`;
        ageResult.innerHTML = `<strong>Age:</strong> ${age}`;
        nationalityResult.innerHTML = `<strong>Nationality:</strong> ${nationality}`;
    };

    // Event listener for button click
    predictButton.addEventListener("click", () => {
        const name = nameInput.value;
        displayResults(name);
    });
});