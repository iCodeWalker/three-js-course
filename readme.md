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

      ## To store buffer geometry data we are going to use Float32Array
