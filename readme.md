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
