/**
 * WIP
 *
 * Current state -> sort of works but code is completely vanilla
 * and not adapted to react.
 *
 * To use, first run `yarn add gsap-trial` to get access to inertia plugin
 */
'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { horizontalLoopDraggable } from './horizontalLoopDraggable';

const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const colors = ['bg-green-500', 'bg-orange-500', 'bg-white', 'bg-purple-500'];

const DraggableCarousel: React.FC = () => {
  const middleItem = Math.round(mockList.length / 2);

  const [activeIndex, setActiveIndex] = useState<number | null>(middleItem);
  const [loop, setLoop] = useState<gsap.core.Timeline | null>(null);
  const [overflow, setOverflow] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    console.log('useEffect');
    if (!listRef.current) return;

    const boxes = Array.from(listRef.current.querySelectorAll('.box'));

    let activeElement: any;
    const newLoop = horizontalLoopDraggable(boxes, {
      paused: true,
      draggable: true,
      center: true, // active element is the one in the center of the container rather than th left edge
      onChange: (element: any, index: number) => {
        console.log({ element });
        // when the active element changes, this function gets called.
        activeElement && activeElement.classList.remove('active');
        element.classList.add('active');
        activeElement = element;
      },
    });
    setLoop(newLoop);

    gsap.set(boxes, { backgroundColor: gsap.utils.wrap(colors) });
  }, []);

  const handleBoxClick = (i: number) => {
    loop?.toIndex(i, { duration: 0.8, ease: 'power1.inOut' });
    setActiveIndex(i);
  };

  const handlePrev = () => {
    loop?.previous({ duration: 0.4, ease: 'power1.inOut' });
  };

  const handleNext = () => {
    loop?.next({ duration: 0.4, ease: 'power1.inOut' });
  };

  const toggleOverflow = () => {
    setOverflow((prevState) => !prevState);
  };

  return (
    <div className='overflow-hidden'>
      <div className='flex justify-center gap-2'>
        <button
          onClick={handlePrev}
          className='px-8 py-4 bg-gray-700 text-white uppercase font-bold cursor-pointer'
        >
          prev
        </button>

        <button
          onClick={toggleOverflow}
          className='px-8 py-4 bg-gray-700 text-white uppercase font-bold cursor-pointer'
        >
          toggle overflow
        </button>

        <button
          onClick={handleNext}
          className='px-8 py-4 bg-gray-700 text-white uppercase font-bold cursor-pointer'
        >
          next
        </button>
      </div>

      <div className='quiet'>
        activeIndex: {JSON.stringify(activeIndex)} (WIP)
      </div>

      <div className='flex items-center justify-center h-[50vh] text-white'>
        <div
          className={`h-[20%] w-[60%] bg-gray-700 relative flex items-center ${
            overflow ? 'overflow-hidden' : ''
          }`}
        >
          <ul
            ref={listRef}
            className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-blue-500'
          >
            {mockList.map((item, i) => (
              <li
                key={i}
                onClick={() => handleBoxClick(i)}
                className={`flex items-center justify-center h-[80%] w-[20%] m-0 p-0 relative flex-shrink-0 text-black text-2xl cursor-pointer ${
                  colors[i % colors.length]
                } box ${activeIndex === i ? 'active' : ''}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DraggableCarousel;
