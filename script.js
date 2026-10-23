
const serviceGrid = document.querySelector("#serviceGrid");
const portfolioGrid = document.querySelector("#portfolioGrid");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const menuToggle = document.querySelector("#menuToggle");
const navigation = document.querySelector("#navigation");

// Load the sample information from db.json
async function loadWebsiteData() {
    try {
        const response = await fetch("db.json");

        if (!response.ok) {
            throw new Error("Could not load the website data.");
        }

        const data = await response.json();

        displayServices(data.services);
        displayProjects(data.projects);
    } catch (error) {
        serviceGrid.innerHTML =
            "<p>Services could not load. Run the website using VS Code Live Server.</p>";

        portfolioGrid.innerHTML =
            "<p>Project concepts could not load. Please check db.json and try again.</p>";

        console.error("Website data error:", error);
    }
}

// Display the three business divisions
function displayServices(services) {
    serviceGrid.innerHTML = "";

    services.forEach(function(service) {
        const card = document.createElement("article");
        card.classList.add("service-card");

        const icon = document.createElement("div");
        icon.classList.add("service-icon");
        icon.textContent = service.icon;

        const title = document.createElement("h3");
        title.textContent = service.name;

        const description = document.createElement("p");
        description.textContent = service.description;

        const list = document.createElement("ul");

        service.items.forEach(function(item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        const link = document.createElement("a");
        link.classList.add("card-link");
        link.href = service.link;
        link.textContent = "Discuss this service →";

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(list);
        card.appendChild(link);

        serviceGrid.appendChild(card);
    });
}

// Display sample project concepts
function displayProjects(projects) {
    portfolioGrid.innerHTML = "";

    projects.forEach(function(project) {
        const card = document.createElement("article");
        card.classList.add("portfolio-card");

        const label = document.createElement("span");
        label.classList.add("portfolio-label");
        label.textContent = project.status;

        const title = document.createElement("h3");
        title.textContent = project.title;

        const category = document.createElement("p");
        category.textContent = project.category;

        const description = document.createElement("p");
        description.textContent = project.description;

        card.appendChild(label);
        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(description);

        portfolioGrid.appendChild(card);
    });
}

// Open and close the mobile navigation
menuToggle.addEventListener("click", function() {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navigation.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Prepare an email draft instead of pretending to store a message
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const service = document.querySelector("#service").value;
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !service || !message) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    const subject = encodeURIComponent("Eloquence project enquiry: " + service);

    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Service: " + service + "\n\n" +
        "Project details:\n" + message
    );

    formMessage.textContent =
        "Your email draft is being prepared. Review it before sending.";

    // Replace this address with your real business email before publishing.
    window.location.href =
        "mailto:YOUR-BUSINESS-EMAIL@example.com?subject=" +
        subject + "&body=" + body;
});

// Display the current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Start loading the data
loadWebsiteData();
