package andeandas

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.awt.image.BufferedImage;
import java.awt.*;
import java.io.*;
import javax.imageio.ImageIO;

class ImagenService {

    static transactional = false

    public void saveImageAndThumbnail(InputStream is, String path, String nomFichImagen, String nomFichThumb, int anchoThumb) throws IOException{
        BufferedImage imagen = ImageIO.read(is);
        if (imagen==null)
            throw new IOException("no es una imagen o el formato es incorrecto");
        //guardar imagen original en formato JPG
        ImageIO.write(imagen, "jpg", new File(path+"/"+nomFichImagen));
        //calculamos el alto del thumbnail. Hay que mantener las proporciones del original
        double anchoOriginal = (double) imagen.getWidth();
        double altoOriginal = (double) imagen.getHeight();
        double ratioOriginal = anchoOriginal / altoOriginal;
        int altoThumb = (int)(anchoThumb / ratioOriginal);
        //creamos el thumbnail
        BufferedImage thumb = new BufferedImage(anchoThumb, altoThumb, imagen.getType());
        //dibujamos en él la imagen escalada
        Graphics2D graphics2D = thumb.createGraphics();
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
            RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        graphics2D.drawImage(imagen, 0, 0, anchoThumb, altoThumb, null);
        //guardar thumbnail en formato JPG
        ImageIO.write(thumb, "jpg", new File(path+"/"+nomFichThumb));
    }
}
