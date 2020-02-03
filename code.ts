figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" })

  if (msg.type === 'style-export') {
    const page = figma.createPage();
    figma.root.insertChild(0,page);
    const paint_styles = figma.getLocalPaintStyles();
    console.log("text_style",paint_styles);
    const title = figma.createText();
    const nodes: SceneNode[] = [];
    
    title.characters = "ColorStyles"
    title.x = 0;
    title.y = -50;
    title.fontSize = 30
    page.appendChild(title);
    nodes.push(title);
    const BASE_HEIGHT = 150;
    let x_i = 0,y_i = 0;
    paint_styles.forEach((paint_style,i)=>{
      const rect = figma.createRectangle();
      const label = figma.createText();
      if(x_i >= 10) {
        x_i = 0;
        y_i = y_i + 1;
      }
      rect.x = x_i * BASE_HEIGHT;
      rect.y = y_i * BASE_HEIGHT;
      label.x = x_i * BASE_HEIGHT;
      label.y = y_i * BASE_HEIGHT + 100;
      
      label.characters = paint_style.name
      rect.fills = paint_style.paints;
      console.log(i,x_i,y_i,rect.x,rect.y,paint_style.name,paint_style.paints);
      x_i = x_i + 1;

      page.appendChild(rect);
      page.appendChild(label);
      nodes.push(rect);
      nodes.push(label);
    })
    
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

};
