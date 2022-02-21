const plugin = require("tailwindcss/plugin");
module.exports = {
    content: ["index.html", "src/**/*.{ts,tsx,js,jsx,html}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/custom-forms"),
    ],
};
