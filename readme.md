# First Chapter : Transform Objects

## Transform Object: To move objects

There are 4 properties to transom objects

1. position.
2. scale.
3. rotation.
4. quaternion. (Type of rotation)
   All classes that inherit from Object3D possess there 4 properties.
   These properties are compiled in matrices that are handled by GPU.

   ## Position

   Position : Position lets us move objects. Position has 3 properties x,y and z
   In Three js we consider:

   1. x-axis going to right direction.
   2. y-axis going to upward direction.
   3. z-axis going to forward direction. (from screen)

   Position is not an object. It inherits from "Vector3". Vector3 is a class that we can use to position things or objects in space. Ex : new THREE.Vector3(1,1,1).

   mesh.position.x = 0.7;
   mesh.position.y = -0.7;
   mesh.position.y = -0.6;

   can also use "set" method to set values of x,y,z
   mesh.position.set(0.7, -0.6, 1);

   gives us the distance between center of the scene and postion of mesh.
   mesh.position.length();

   gives distance between some random point and object.
   mesh.position.distanceTo(new THREE.Vector3(1, 1, 1));

   gives us distance between camera and object
   mesh.position.distanceTo(camera.position);

   Takes the length of the vector and reduces it to 1.
   mesh.position.normalize();

   We can use axis helper to get information about axis whereabout. It displays a colored line for each axis.
   const axisHelper = new THREE.AxesHelper(2); // can increase length of axis using arg
   scene.add(axisHelper);

   ## Scale

   Scale : Scale up or decrease the size of object.

   mesh.scale.x = 2;
   mesh.scale.y = 0.5;
   mesh.scale.z = 0.5;

   mesh.scale.set(0.5, 0.5, 0.5);

   ## Rotation or Quaternion:

   Updating one will automatically update the other.

   Rotation also have x,y and z properties but it is from "Euler" class.
   '''When we change the x,y or z property we can think of putting a line through the object center in axis direction and then rotate the object on the line.'''

   Becareful on using rotation as when we rotate on an axis, we might also rotate the other axis.
   The rotation goes by default in the x,y,and z order and you can get strange result like the axis in not working. And a very unexpected result on object. This is called gimbal look.

   To fix this we can change the order of axis using reorder() method.
   object.rotation.reorder('yxz')
   imp : reorder before changing the rotation

   mesh.rotation.reorder("YXZ");
   mesh.rotation.x = Math.PI _ 0.25;
   mesh.rotation.z = Math.PI _ 0.25;

   ## Quaternion :

   Quaternion is representation of rotation but in more mathematical way.
   we can get the same results with using different formulas,different axis and different calculation.

   Object3D instances have a lookAt() method. It makes camera to look at a specific position.

   ## Group :

   Creating groups helps us to group together different objects and apply trasformation on all of them as one entity.

   // Create group
   const group = new THREE.Group();

   // performing transformation on group
   group.position.y = 1;
   group.scale.y = 1.4;
   group.rotation.y = 1;

   // adding group to scene
   scene.add(group);

   const cube1 = new THREE.Mesh(
   new THREE.BoxGeometry(1, 1, 1),
   new THREE.MeshBasicMaterial({ color: 0xff0000 })
   );
   const cube2 = new THREE.Mesh(
   new THREE.BoxGeometry(1, 1, 1),
   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
   );

   cube2.position.x = -2;
   const cube3 = new THREE.Mesh(
   new THREE.BoxGeometry(1, 1, 1),
   new THREE.MeshBasicMaterial({ color: 0xff00ff })
   );
   cube3.position.x = 2;

   // adding objects to group
   group.add(cube1);
   group.add(cube2);
   group.add(cube3);

# Second Chapter : Animating Objects

For animations we need to update objects and do a render on each frame.
We are going to do this inside a function. For this we can use a function window.requestAnimationFrame()

## IMP : A 60 FPS device will call requestAnimationFrame function 60 times in one second

The purpose of requestAnimationFrame function is to call the function on the next frame.

## IMP : The higher the frame rate the faster the animation

## ADAPTATION FPS

We need to do what we call adapt to the framerate, so our animation looks same on devices having different
Frame Per Seconds.

1.  For this we can use Time with the help of JS "Date" function:
2.  Can use Three.js built in solution named "Clock".

For having more control,create tweensc create timelines we can use a third party library.
In this we will use GSAP

3.  Create a tween : gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });

# Third Chapter : Cameras

## Camera is an abstract class. We are not supposed to use it directly.

     Different types of camera :
      1. Array camera:
            Render the scene from multiple cameras on a specific area of the render. This can be used for multiple player game where each player has a different view.
      2. Cube camera:
            Do 6 renders, each one facing a different direction. can render the surrounding for things like environment map, reflection, refraction, shadow etc. Threejs uses it internally.
      3. Stereo camera :
            Render the scene through two cameras that mimic the eyes to create a parallax effect
      4. Perspective camera :
            Redner the scene with perspective.
      5. Orthographic camera :
            Render the scene withour perspective. Means object have same size no matter it's distance from camera.

      # Perspective Camera :

      const camera = new THREE.PerspectiveCamera(FOV, Aspect ratio, near, far );
      1. FOV : Vertical vission angle, in degrees
      2. Aspect ratio : ratio of width of render and height of render.
      3. Near : How near a camera can see.
      4. Far : How far a camera can see.
      IMP : Any object closer than the near or further from the far will not be visible.

      # Orthographic camera :

      Orthographic camera differs from Perspective camera by its lack of perspective.
      Objects have same size regardless of its distance from the camaera.

      const camera = new THREE.OrthographicCamera(left,right,top,bottom, near,far);

      Custom Contrls :

      To be able to view the objects from different angles we need to have custom controls for camera.

      IMP : First we need mouse coordinates on the page. Listen to the mousemove events with addEventListener and retrieve the event.clientX and event.clientY

      event.clientX and event.clientY have values in pixels, but we can't use them directly.

      Prefer to have value of coordinates as amplitude of "1" i.e. between 0 and 1. In this way it wil work fine on all devices having different screen sizes.
      We can do this by dividing it by width and height of viewport.
      ( Ex: event.clientX / sizes.width or
      event.clientY / sizes.height)

      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;

      subtracting 0.5 will give us negative and positive values as the amplitude is 1, that will help us with camera positioning.

      We can move the camera around the center of the scene by using Math.sin(), Math.cos() and Math.PI

      IMP : When we combine cos on one axis and sin on another axis with the same angle we get the position on the circle.

      What are the postion we are going to use?
      What are the axis to position our camera around the cube?

      camera.position.x = Math.sin(cursor.x * 10) * 3;
      camera.position.z = Math.cos(cursor.x * 10) * 3;

      #################### USING BUILT-IN CONTROL ##################

      1. Device Orientation Controls
            DeviceOrientationControls will automatically retrieve the device orientation if our device, OS or browser allow it and rotate the camera accordingly. Useful to create immersive universes and VR experience.
      2. Fly Controls
            FlyControls enable moving the camera like if we were on a spaceship. We can rotate on all 3-axes.
            go forward and go backward.
      3. First Person Control
            FirstPersonControla is like FlyControls, but with a fixed up axis. Doesn't work like FPS game.
            useful for moving forward backward in plane. cannot move up or down if we have "x" as fixed axis.
      4. Pointer Lock Control
            PointerLockControls uses the pointer lock javascript API. Hard to use and almost only handles the pointer lock and camera rotation. PointerLockControls is all about making cursor disappear.
      5. Orbit Control
            OrbitControls similar to controlswe made with more features. Control the axis or orbits for camera movements.
      6. TrackBall Control
            TrackBallControls is like OrbitControls without vertical angle limit.
      7. Transform Control
            TransformControls has nothing to do with camera. It helps us to move objects
      8. Drag Control
            DragControls used to drag objects on the plane

      To get the viewport width and height we can use, window.innerWidth and window.innerHeight

# Fourth Chapter : Geometries

      1. Geometry is composed of vertices (point coordinates in 3D spaces) and faces (triangle that join those vertices to create a surface)
      2. Can be used for meshes but can also be used for particles. One Vertex makes one particle.
      3. In geometries we can store more data than just coordinates, each of the vertex have will have position, UV coordinates, normal and many more things.

      ## Built-in geometries

      All geometries inherit from BufferGeometry. This class has many built-in methods like translate(),   rotateX(), normal()

      1. BoxGeometry()
      2. PlaneGeometry()
      3. CircleGeometry()
      4. ConeGeometry()
      5. CylinderGeometry()
      6. RingGeometry()
      7. TorusGeomtry()
      8. TorusKnotGeometry()
      9. DodecahedronGeomtry()
      10. OctahedronGeometry()
      11. TetrahedronGeometry()
      12. SphereGeometry()
      13. ShapeGeometry()
      14. TubeGeomtry()
      15. ExtrudeGeometry()
      16. LatheGeomtry()
      17. TextGeomtry()

      By combining these geometries we can create pretty complex shapes.

      Box Geomtry : Has 6 parameters
            1. width : The size on the x-axis.
            2. height : The size on the y-axis.
            3. depth : The size on the z-axis.
            4. widthSegments : How many subdivisions in the x-axis.
            5. heightSegments : How many subdivisions in the y-axis.
            6. depthSegments : How many subdivisions in the z-axis.

            Subdivisions correspond to how much triangles should compose a face.
            1 = 2 triangles per face
            2 = 8 triangles per face

            const geometry = new THREE.BoxGeometry(1,1,1,2,2,2)

            IMP : To have more details we need more triangles.

            We can use 'wireframe : true' on the material to have a view of segments.

## CREATING OWN BUFFER GEOMETRY

      We crete our own triangle and with that triangle we create bunch of more triangles

      1. To store buffer geometry data we are going to use Float32Array. We are going to store vertices coordinates to create the faces
      2. Float32Array : Typed Array, stores float values, fixed length, Easier to handle for computers

      Ways to create and fill Float32Array:

       const positionsArray = new Float32Array(9);

      // value of 1st vertex
      positionsArray[0] = 0; // x coordinate
      positionsArray[1] = 0; // y coordinate
      positionsArray[2] = 0; // z coordinate
      // value of 2nd vertex
      positionsArray[3] = 0;
      positionsArray[4] = 1;
      positionsArray[5] = 0;
      // value of 3rd vertex
      positionsArray[6] = 1;
      positionsArray[7] = 0;
      positionsArray[8] = 0;

      const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

      ## now we have to convert this Float32Array to a BufferAttribute

      const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3); // "3" corresponds to how much values compose  one vertex.

      ## now we can add this BufferAttribute to our BufferGeometry

      geometry.setAttribute('position', positionsAttribute)

# Fifth Chapter : Debug UI

      // To instantiate debug ui
      const gui = new lil.GUI();

      // Elements also known as tweaks

      There are different types of elements we can add to the debug panel
      1. Range : for number with minimum and maximum value
      2. Color : for color with various format
      3. Text : for simple texts
      4. Checkbox : for booleans
      5. Select : for choice from a list of values
      6. Button : to trigger functions
      7. Folder : to organise panel if we have many elements.

      ## To add elements to the panel we can use gui.add(...)
      1st parameter is an object
      2nd parameter is the property we want to tweak
      3rd paramter is minimum value
      4th parameter is maximum value
      5th paramter is steps

      gui.add(mesh.position, 'y', -3, 3. 0.1)

      // can also use min(...), max(...) and step(...) methods on the gui

      gui.add(mesh.position, 'y').min().max().step()
      gui.add(mesh, "visible");
      gui.add(material, "wireframe");
      gui.addColor(material, "color");

      // To trigger a function, we need to store it in an object, we can use a 'parameters' object and create
      // a spin method

      const parameters = {
            color: 0xff0000,
            spin: () => {
                  console.log("spin");
                  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
            },
      };

      gui.add(parameters, "spin");

# Sixth Chapter : Textures

      Textures are the images that will cover the surface of the geometry.

      Color textures :
            1. Most Simple One.
            2. Applied on the geometry
      Aplha texture :
            1. Gray Scale images.
            2. White is visible.
            3. Black is not visible
      Height or Displacement texture :
            1. Gray scale image.
            2. Move vertices up or down according to the requirement to create some relief.
            3. Need enough subdivisions. Means enough vertices on the surface.
            4. like if the area is white vertices may move up and if it is black vertices will down. The gray will stay at its place. Instead of flat plane we will get something like relief Ex : terrain.
      Normal texture :
            1. Add details. Mostly about lighting.
            2. Dosen't need sub divisions.
            3. The vertices won't move.
            4. Lure the light about the face orientation.
            5. Better performance than adding a height texture with a lot of sub divisions.
      Ambient occlusion texture:
            1. Gray scale image.
            2. Add fake shadows in crevices.
            3. Not physically accurate.
            4. Help to create contrast and see details.
      Metalness texture :
            1. Gray scale image.
            2. white is metallic.
            3. black is non metallic.
            4. Mostly for reflection.
      Roughness texture :
            1. Gray scale image.
            2. In duo with metalness.
            3. white is rough.
            4. black is  smooth.
            5. Mostly for light dissipation.
      And many others......

      These textures follow PBR principles :
            Physically Based Rendering
            Tends to follow real-life directions to get realistice results

## LOAD IMAGE USING NATIVE JAVASCRIPT

      const image = new Image();
      // we can create the texture outside of the function and update it once the image is
      // loaded with "needsUpdate = true"

      const texture = new THREE.Texture(image); // the image we are passing here is not loaded yet

      image.addEventListener("load", () => {
      // we need to use this texture in the material
            const texture = new THREE.Texture(image);
      //  Now we tells texture to update itself
            texture.needsUpdate = true;
      });

      image.src = "/textures/door/color.jpg";

## LOAD USING TEXTURE LOADER

      const textureLoader = new THREE.TextureLoader();
            we can send 3 functions after the path
            load - when the image loaded successfully.
            progress - when the loading is progress.
            error - if something went wrong.
      const texture = textureLoader.load(
            "/textures/door/color.jpg",
            () => {
                  console.log("load...");
            },
            () => {
                  console.log("progress...");
            },
            () => {
                  console.log("error...");
            }
      );

## LOADING MANAGER

      When we have multiple textures or models or texts to load we can use loading manager to know the progress
      of all this loading

      We can use a LoadingManager to mutualize the events it's useful if we want to know the global loading progress or be informed when everything is loaded

      const loadingManager = new THREE.LoadingManager();
      loadingManager.onStart = () => {
            console.log("onStart");
      };

      loadingManager.onLoad = () => {
            console.log("onLoad ");
      };

      loadingManager.onProgress = () => {
            console.log("onProgress");
      };

      loadingManager.onError = () => {
            console.log("onErrror");
      };

## UV unwrapping

      Textures are being stretched or squeezed in different ways to cover the geometry.
      This is called UV unwrapping and it's like unwrapping an origami or candy wrap to make it flat.
      Each vertex will have a 2d coordinate on a flat plane (usually on square)

      UV coordinates are 2d coordinates in plane of the 3d vertex of the model.

      If we create our own geometry we have to specify the UV coordinates.
      If we are making geometry using a 3d software, we have to do the UV wrapping

      Textures are placed on the geometries using a very specific way because of UV coordinates.

## TRANSFORMING THE TEXTURE

      // =============== Repeat
      colorTexture.repeat.x = 2;
      colorTexture.repeat.y = 3;
      // By default the texture is not repeated and the last pixel gets stretched
      // We can change this with THREE.RepeatWrapping on the wrapS and wrapT properties

      colorTexture.wrapS = THREE.RepeatWrapping;
      colorTexture.wrapT = THREE.RepeatWrapping;

      // can use MirrorRepeatWrapping to have a  mirror affect

      colorTexture.wrapS = THREE.MirroredRepeatWrapping;
      colorTexture.wrapT = THREE.MirroredRepeatWrapping;

      // =============== offset
      // Shifts the texture
      colorTexture.offset.x = 0.5;
      colorTexture.offset.y = 0.5;

      // =============== Rotation
      // we can rotate the texture using rotation property
      // The rotation occurs around the bottom left corner, that is the 0, 0 UV coordinate
      colorTexture.rotation = Math.PI * 0.25;
      // We can change the pivot point (the point around which rotation happens) with the center property
      colorTexture.center.x = 0.5;
      colorTexture.center.y = 0.5;

## Mipmapping

      Mipmapping is a technic that consists of creating half a smaller version of a texture again and again until we get a 1x1 texture.
      All those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture

      There are 2 types of filter algorithms that we can choose.
      1. Minification filter
            Happens when the pixels of texture are smaller than the pixel of render. In simple words, the texture is too big for the surface it covers.
            When we zoom out to, when the geometry is far from camera.

            We can change the minification filter of the texture using the minFilter property with these 6 values.
            1. THREE.NearestFilter
            2. THREE.LinearFilter
            3. THREE.NearestMipmapNearestFilter
            4. THREE.NearestMipmapLinearFilter
            5. THREE.LinearMipmapNearestFilter
            6. THREE.LinearMipmapLinearFilter (default)
      2. Maginfication filter
            Happens when the pixels of the texture are bigger than the pixels of the render. In simple words the texture is too small for the surface it covers.

            We can change the magnification filter of the texture using the magFilterproperty with these 2 values
            1. THREE.NearestFilter
            2. THREE.LinearFilter (default)

      // NearestFilter is cheaper than other and we get better performance and better framerates if result is fine go with it.

      IMP : When we use NearestFilter value to minFilter we don't need mipmapping, so instead of letting Threejs and the GPU handle those mipmapping we can deactivate it.
      colorTexture.generateMipmaps = false
      colorTexture.minFilter = THREE.NearestFilter;

## When Preparing our texture, we need to have 3 crucial elments.

      1. Weight (.jpg or .png)
      2. Size (Resolution) have image size in multiple of 2. 512x512, 1024x1024, 512x2048 etc
      3. Data

      IMP : The difficulty is to find the right combination of texture formats and resolutions.

# SEVENTH CHAPTER : MATERIALS

      Materials are used to put a color on each visible pixel of the geometries.
      The algorithms are written in the form of the shaders.
      We don't need to write shaders and can use the built-in materials

      Till now we have used MeshBasicMaterial which applies a uniform color or texture on our geometry.

      const material = new THREE.MeshBasicMaterial({color: 0xff0000});

      // We Create 3 different geometries (a sphere, a plane and a torus)

      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
      sphere.position.x = -1.5;

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

      const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.2, 16, 32),
            material
      );
      torus.position.x = 1.5;

      scene.add(sphere, plane, torus);

## Material properties can be set in two ways

      1. Directly while instanciating
            const material = new THREE.MeshBasicMaterial({
                  map : doorColorTexture
            })

      2. After instanciating
            const material = new THREE.MeshBasicMaterial()
            material.map = doorColorTexture

## Types of Materials :

      1. MeshBasicMaterial :
            1. It is the most basic material
            2. const material = new THREE.MeshBasicMaterial();
                  material.map = doorColorTexture;
                  material.color = "red" // will give us error,we can set color in two ways
                  material.color = new THREE.Color("pink");
                  material.color.set("#ff00ff");
                  material.wireframe = true;

            // opacity controls the general opacity, to have it work we need to set transparent = true
                  material.opacity = 0.5;
                  material.transparent = true;

            // alphamap controls the transparency with texture
                  material.transparent = true;
                  material.alphaMap = doorAlphaTexture;

            // side lets us decide which side of face is visible
                  // THREE.FrontSide (default)
                  // THREE.BackSide
                  // THREE.DoubleSide
                  material.side = THREE.DoubleSide;
      2. MeshNormalMaterial :
            1. Displays a nice purple color that looks like normal texture.
            2. Normals are the information about the direction of the outside of the face.
            3. Normals can be use for lighting, reflection, refraction etc. If the normal is in the direction of the light than the object will be visible and if the normal is in the opposite direction of light than the object is not visible.
            4. MeshNormalMaterial shares common properties with MeshBasicMaterial like wireframe, transparent, opacity, and side. But it also include flatShading.

            5. flatShading will flatten the faces, it creates squares on the surface so the surface is not smooth after this.
            flatShading = true;
            6. MeshNormalMaterial is usually used to debug normals
      3. MeshMatcapMaterial :
            1. Display a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.
            2. const material = new THREE.MeshMatcapMaterial();
            3. The algorithm will take colors inside the texture or pick the color inside the texture to put it on the geometry relative to the camera.
            4. Change texture using matcap property
            material.matcap = matcapTexture

            5. We get an illusion that objects are illuminated, we don't need light for making this material visible.
      4. MeshDepthMaterial :
            1. MeshDepthMaterial will simply color the geometry in white if it's close to the 'near' value of the camera and will color the geomtry black if its close to the 'far' value of the camera.
            2. const material = new THREE.MeshDepthMaterial()

            IMP : MeshBasicMaterial, MeshNormalMaterial, MeshMatcapMaterial, MeshDepthMaterial Don't need light for visibility.
