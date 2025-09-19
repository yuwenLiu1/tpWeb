
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.shapes = new Array();
    
    this.addShape = function(shape) {
        this.shapes.push(shape);
    };
    
    this.getShapes = function() {
        return this.shapes;
    };
    
    this.removeShape = function(shape) {
        var index = this.shapes.indexOf(shape);
        if (index > -1) {
            this.shapes.splice(index, 1);
        }
    };
}

function Shape(color, thickness) {
    this.color = color;
    this.thickness = thickness;
}

function Rectangle(startX, startY, endX, endY, color, thickness) {
    Shape.call(this, color, thickness);
    this.startX = startX;
    this.startY = startY;
    this.width = endX - startX;
    this.height = endY - startY;
}
Rectangle.prototype = new Shape();

function Line(startX, startY, endX, endY, color, thickness) {
    Shape.call(this, color, thickness);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
}
Line.prototype = new Shape();