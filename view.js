
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
// Ajoute la méthode paint au prototype de la classe de base Shape.
// Cette méthode gère le style commun à toutes les formes (couleur et épaisseur du trait).
Shape.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
  };
  
  // Ajoute la méthode paint au prototype de la classe Rectangle.
  Rectangle.prototype.paint = function(ctx) {
    // Appelle la méthode paint du prototype parent (Shape) pour définir le style.
    Shape.prototype.paint.call(this, ctx);
    
    // Dessine la forme du rectangle sur le canvas.
    ctx.beginPath();
    ctx.rect(this.startX, this.startY, this.width, this.height);
    ctx.stroke();
  };
  
  // Ajoute la méthode paint au prototype de la classe Line.
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
  Drawing.prototype.paint = function(ctx,canvas) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    this.shapes.forEach(function(shape) {
      shape.paint(ctx);
    });
  };

  function updateShapeList(drawing) {
    console.log("updateShapeList called"); // Debug
    
    var shapeList = document.getElementById('shapeList');
    if (!shapeList) {
        console.error("Element 'shapeList' not found in DOM");
        return;
    }
    
    // Vider la liste
    shapeList.innerHTML = '';
    
    // Récupérer les formes (ajuster selon votre implémentation)
    var shapes = drawing.shapes || drawing.getShapes() || drawing.getForms();
    
    if (!shapes || shapes.length === 0) {
        shapeList.innerHTML = '<li class="list-group-item text-muted">Aucune forme créée</li>';
        return;
    }
    
    console.log("Updating list with " + shapes.length + " shapes"); // Debug
    
    // Créer un élément pour chaque forme
    shapes.forEach(function(shape, index) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Texte descriptif
        var shapeText = document.createElement('span');
        
        if (shape instanceof Rectangle) {
            shapeText.innerHTML = 'Rectangle ' + (index + 1) + 
                ' <small class="text-muted">(' + 
                Math.round(shape.startX) + ', ' + Math.round(shape.startY) + 
                ') - (' + Math.round(shape.startX + shape.width) + ', ' + 
                Math.round(shape.startY + shape.height) + ')</small>';
        } else if (shape instanceof Line) {
            shapeText.innerHTML = 'Ligne ' + (index + 1) + 
                ' <small class="text-muted">(' + 
                Math.round(shape.startX) + ', ' + Math.round(shape.startY) + 
                ') à (' + Math.round(shape.endX) + ', ' + 
                Math.round(shape.endY) + ')</small>';
        } else {
            shapeText.textContent = 'Forme ' + (index + 1);
        }
        
        // Indicateur de couleur
        var colorIndicator = document.createElement('span');
        colorIndicator.className = 'badge bg-primary me-2';
        colorIndicator.style.backgroundColor = shape.color;
        colorIndicator.style.width = '15px';
        colorIndicator.style.height = '15px';
        colorIndicator.title = 'Couleur: ' + shape.color;
        
        shapeText.prepend(colorIndicator);
        
        // Bouton de suppression
        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerHTML = '× Supprimer';
        
        // Événement de suppression
        deleteButton.addEventListener('click', (function(shapeToRemove) {
            return function() {
                console.log("Delete button clicked for shape", shapeToRemove);
                
                // Méthode 1: Si vous avez removeShape dans Drawing
                if (drawing.removeShape) {
                    drawing.removeShape(shapeToRemove);
                } 
                // Méthode 2: Sinon, supprimer directement du tableau
                else if (drawing.shapes) {
                    var index = drawing.shapes.indexOf(shapeToRemove);
                    if (index > -1) {
                        drawing.shapes.splice(index, 1);
                    }
                }
                
                // Redessiner le canvas
                if (window.ctx && window.canvas) {
                    drawing.paint(window.ctx, window.canvas);
                }
                
                // Mettre à jour la liste
                updateShapeList(drawing);
            };
        })(shape));
        
        listItem.appendChild(shapeText);
        listItem.appendChild(deleteButton);
        shapeList.appendChild(listItem);
    });
}



  
