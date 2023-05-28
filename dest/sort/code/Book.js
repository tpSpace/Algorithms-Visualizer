export default class Book {
    constructor(name) {
        this.name = name.toUpperCase();
        this.color = this.getColor();
    }
    getColor() {
        const colorMap = {
            A: "#FFBF00",
            B: "#0095B6",
            C: "#FFA07A",
            D: "#F0E68C",
            E: "#50C878",
            F: "#B22222",
            G: "#DAA520",
            H: "#DF73FF",
            I: "#FFFFF0",
            J: "#00A86B",
            K: "#C3B091",
            M: "#2F2F4F",
            N: "#000080",
            O: "#FFA500",
            P: "#D1E231",
            Q: "#BEBEBE",
            R: "#8B0000",
            S: "#F4A460",
            T: "#008080",
            U: "#3F00FF",
            V: "#8F00FF",
            W: "#F5DEB3",
            X: "#F1B82D",
            Y: "#FFFF00",
            Z: "#008000"
        };
        return colorMap[this.name] || "#000000";
    }
}
