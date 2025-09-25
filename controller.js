// Définit une énumération pour les modes d'édition
var editingMode = { rect: 0, line: 1 };

/**
 * La classe Pencil agit comme le contrôleur de l'application.
 * Elle gère l'état de l'outil de dessin et la création des formes.
 * @param {object} ctx Le contexte de rendu du canvas.
 * @param {object} drawing L'instance du modèle (le dessin).
 * @param {object} canvas L'élément canvas du DOM.
 */
function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.rect;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = null;

    this.drawing = drawing;
    this.ctx = ctx;
    this.canvas = canvas;

    // Liez les widgets à la classe pour modifier les attributs
    document.getElementById('butRect').addEventListener('click', () => {
        this.currEditingMode = editingMode.rect;
    });

    document.getElementById('butLine').addEventListener('click', () => {
        this.currEditingMode = editingMode.line;
    });

    document.getElementById('spinnerWidth').addEventListener('change', (evt) => {
        this.currLineWidth = evt.target.value;
    });

    document.getElementById('colour').addEventListener('change', (evt) => {
        this.currColour = evt.target.value;
    });

    // Instanciation de l'interaction DnD avec le canvas et le contrôleur actuel (this)
    new DnD(this.canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
    this.onInteractionStart = (dnd) => {
        if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(dnd.startX, dnd.startY, dnd.startX, dnd.startY, this.currColour, this.currLineWidth);
        } else {
            this.currentShape = new Line(dnd.startX, dnd.startY, dnd.startX, dnd.startY, this.currColour, this.currLineWidth);
        }
    };

    this.onInteractionUpdate = (dnd) => {
        if (!this.currentShape) return;
        this.currentShape.thickness = this.currLineWidth;
        
        if (this.currentShape instanceof Rectangle) {
            this.currentShape.width = Math.abs(dnd.endX - dnd.startX);
            this.currentShape.height = Math.abs(dnd.endY - dnd.startY);
            this.currentShape.startX = Math.min(dnd.startX, dnd.endX);
            this.currentShape.startY = Math.min(dnd.startY, dnd.endY);
        } else {
            this.currentShape.endX = dnd.endX;
            this.currentShape.endY = dnd.endY;
        }

        this.drawing.paint(this.ctx, this.canvas);
        this.currentShape.paint(this.ctx);
    };

    this.onInteractionEnd = (dnd) => {
        if (!this.currentShape) return;
        
        if (this.currentShape instanceof Rectangle) {
            this.currentShape.width = Math.abs(dnd.endX - dnd.startX);
            this.currentShape.height = Math.abs(dnd.endY - dnd.startY);
            this.currentShape.startX = Math.min(dnd.startX, dnd.endX);
            this.currentShape.startY = Math.min(dnd.startY, dnd.endY);
        } else {
            this.currentShape.endX = dnd.endX;
            this.currentShape.endY = dnd.endY;
        }

        this.drawing.addShape(this.currentShape);
        this.currentShape = null;
        this.drawing.paint(this.ctx, this.canvas);
        
        updateShapeList(this.drawing);
    }; 
}