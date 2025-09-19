
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
// Ajoute la méthode paint au prototype de la classe de base Shape.
// Cette méthode gère le style commun à toutes les formes (couleur et épaisseur du trait).
Shape.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
  };
  
  // Ajoute la méthode paint au prototype de la classe Rectangle.
  // Elle dessine un rectangle.
  Rectangle.prototype.paint = function(ctx) {
    // Appelle la méthode paint du prototype parent (Shape) pour définir le style.
    Shape.prototype.paint.call(this, ctx);
    
    // Dessine la forme du rectangle sur le canvas.
    ctx.beginPath();
    ctx.rect(this.startX, this.startY, this.width, this.height);
    ctx.stroke();
  };
  
  // Ajoute la méthode paint au prototype de la classe Line.
  // Elle dessine une ligne.
  Line.prototype.paint = function(ctx) {
    // Appelle la méthode paint du prototype parent (Shape) pour définir le style.
    Shape.prototype.paint.call(this, ctx);
    
    // Dessine la forme de la ligne sur le canvas.
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  };
  
  // Ajoute la méthode paint au prototype de la classe Drawing.
  // Elle gère l'affichage complet du dessin, y compris l'arrière-plan et toutes les formes.
  Drawing.prototype.paint = function(ctx,canvas) {
    // Peint l'arrière-plan du canvas en gris clair.
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Parcourt chaque forme du dessin et appelle sa propre méthode paint.
    this.shapes.forEach(function(shape) {
      shape.paint(ctx);
    });
  };