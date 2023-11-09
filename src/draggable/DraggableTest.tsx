import { useLayoutEffect, useRef } from 'react';
import Container from '../ui/Container';
import { gsap } from 'gsap-trial';
import { Draggable } from 'gsap-trial/Draggable';
import { InertiaPlugin } from 'gsap-trial/InertiaPlugin';
gsap.registerPlugin(Draggable, InertiaPlugin);

export default function DraggableTest() {
  const container = useRef<HTMLDivElement>(null);
  const someObject = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!someObject?.current) return;

    Draggable.create(someObject.current, {
      type: 'x', // resticted to x movement
      bounds: container?.current ?? undefined,
      inertia: true, // smoothness on release
      onClick: function () {
        console.log('clicked');
      },
      onDragEnd: function () {
        console.log('drag ended');
      },
    });
  }, []);

  return (
    <Container title='Draggable Example'>
      <div ref={container} className='w-full h-[50vh] bg-slate-800'>
        <p>Container</p>

        <div ref={someObject} className='bg-yellow-800 w-fit p-4'>
          Some object
        </div>
      </div>
    </Container>
  );
}
