"use client";

import { useEffect, useRef } from "react";

type MotionElement = HTMLElement & {
  dataset: DOMStringMap & {
    cursorLabel?: string;
    floatSpeed?: string;
    magnetic?: string;
    marquee?: string;
    tilt?: string;
  };
};

const interactiveSelector =
  "a, button, summary, [data-cursor], [data-magnetic], [data-tilt]";

function closestMotionElement(
  target: EventTarget | null,
  selector: string,
): MotionElement | null {
  return target instanceof Element
    ? (target.closest(selector) as MotionElement | null)
    : null;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function InteractionEngine() {
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const revealElements = new Set<MotionElement>();
    const matchingElements = (node: Node, selector: string) => {
      if (!(node instanceof HTMLElement)) return [];
      const matches = node.matches(selector)
        ? [node as MotionElement]
        : [];
      return matches.concat(
        Array.from(node.querySelectorAll<MotionElement>(selector)),
      );
    };

    document.querySelectorAll<MotionElement>("[data-reveal]").forEach((item) => {
      revealElements.add(item);
    });

    document
      .querySelectorAll<MotionElement>("[data-reveal-stagger]")
      .forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          child.dataset.reveal = "";
          child.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 7) * 70}ms`,
          );
          revealElements.add(child as MotionElement);
        });
      });

    root.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    revealElements.forEach((item) => {
      if (reducedMotion.matches) {
        item.classList.add("motion-visible");
      } else {
        revealObserver.observe(item);
      }
    });

    const floatElements = Array.from(
      document.querySelectorAll<MotionElement>("[data-float-speed]"),
    );
    const activeFloats = new Set<MotionElement>();
    const floatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as MotionElement;
          if (entry.isIntersecting) activeFloats.add(item);
          else activeFloats.delete(item);
        });
      },
      { rootMargin: "18% 0px" },
    );
    floatElements.forEach((item) => floatObserver.observe(item));

    const marqueeElements = Array.from(
      document.querySelectorAll<MotionElement>("[data-marquee]"),
    );
    const activeMarquees = new Set<MotionElement>();
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const item = entry.target as MotionElement;
        if (entry.isIntersecting) activeMarquees.add(item);
        else activeMarquees.delete(item);
      });
    });
    marqueeElements.forEach((item) => marqueeObserver.observe(item));

    const registerAddedContent = (node: Node) => {
      matchingElements(node, "[data-reveal-stagger]").forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          child.dataset.reveal = "";
          child.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 7) * 70}ms`,
          );
        });
      });

      matchingElements(node, "[data-reveal]").forEach((item) => {
        if (revealElements.has(item)) return;
        revealElements.add(item);
        if (reducedMotion.matches) item.classList.add("motion-visible");
        else revealObserver.observe(item);
      });

      matchingElements(node, "[data-float-speed]").forEach((item) => {
        if (floatElements.includes(item)) return;
        floatElements.push(item);
        floatObserver.observe(item);
      });

      matchingElements(node, "[data-marquee]").forEach((item) => {
        if (marqueeElements.includes(item)) return;
        marqueeElements.push(item);
        marqueeObserver.observe(item);
      });
    };

    const unregisterContent = (node: Node) => {
      matchingElements(node, "[data-reveal]").forEach((item) => {
        revealObserver.unobserve(item);
        revealElements.delete(item);
      });
      matchingElements(node, "[data-float-speed]").forEach((item) => {
        floatObserver.unobserve(item);
        activeFloats.delete(item);
        const index = floatElements.indexOf(item);
        if (index >= 0) floatElements.splice(index, 1);
      });
      matchingElements(node, "[data-marquee]").forEach((item) => {
        marqueeObserver.unobserve(item);
        activeMarquees.delete(item);
        const index = marqueeElements.indexOf(item);
        if (index >= 0) marqueeElements.splice(index, 1);
      });
    };

    const contentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach(unregisterContent);
        mutation.addedNodes.forEach(registerAddedContent);
      });
      measure();
    });

    contentObserver.observe(document.body, { childList: true, subtree: true });

    let pageHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    let scrollDirty = true;
    let currentMagnetic: MotionElement | null = null;
    let currentTilt: MotionElement | null = null;
    let currentInteractive: MotionElement | null = null;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let cursorEnabled = finePointer.matches && !reducedMotion.matches;
    let lastFrame = performance.now();
    let frameId = 0;

    const resetMagnetic = (item: MotionElement | null) => {
      item?.style.setProperty("--magnetic-x", "0px");
      item?.style.setProperty("--magnetic-y", "0px");
      if (item) item.dataset.magneticActive = "false";
    };

    const resetTilt = (item: MotionElement | null) => {
      item?.style.setProperty("--tilt-x", "0deg");
      item?.style.setProperty("--tilt-y", "0deg");
      item?.style.setProperty("--tilt-lift", "0px");
      if (item) item.dataset.tiltActive = "false";
    };

    const setCursorMode = (item: MotionElement | null) => {
      currentInteractive = item;
      const label = item?.dataset.cursorLabel ?? "";
      cursorRingRef.current?.toggleAttribute("data-active", Boolean(item));
      cursorRingRef.current?.toggleAttribute("data-label", Boolean(label));
      if (cursorLabelRef.current) {
        cursorLabelRef.current.textContent = label;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!cursorEnabled || event.pointerType === "touch") return;
      mouseX = event.clientX;
      mouseY = event.clientY;

      const interactive = closestMotionElement(
        event.target,
        interactiveSelector,
      );
      if (interactive !== currentInteractive) setCursorMode(interactive);

      const magnetic = closestMotionElement(
        event.target,
        "[data-magnetic], .button",
      );
      if (magnetic !== currentMagnetic) {
        resetMagnetic(currentMagnetic);
        currentMagnetic = magnetic;
      }
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const strength = clamp(
          Number.parseFloat(magnetic.dataset.magnetic ?? "0.18"),
          0.08,
          0.32,
        );
        const x = clamp(
          (event.clientX - rect.left - rect.width / 2) * strength,
          -16,
          16,
        );
        const y = clamp(
          (event.clientY - rect.top - rect.height / 2) * strength,
          -12,
          12,
        );
        magnetic.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        magnetic.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
        magnetic.dataset.magneticActive = "true";
      }

      const tilt = closestMotionElement(event.target, "[data-tilt]");
      if (tilt !== currentTilt) {
        resetTilt(currentTilt);
        currentTilt = tilt;
      }
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const strength = clamp(
          Number.parseFloat(tilt.dataset.tilt ?? "4"),
          1,
          7,
        );
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tilt.style.setProperty("--tilt-x", `${(-y * strength).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-y", `${(x * strength).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-lift", "-4px");
        tilt.dataset.tiltActive = "true";
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (
        event.relatedTarget instanceof Node &&
        currentInteractive?.contains(event.relatedTarget)
      ) {
        return;
      }
      const nextInteractive = closestMotionElement(
        event.relatedTarget,
        interactiveSelector,
      );
      setCursorMode(nextInteractive);

      if (
        currentMagnetic &&
        !(
          event.relatedTarget instanceof Node &&
          currentMagnetic.contains(event.relatedTarget)
        )
      ) {
        resetMagnetic(currentMagnetic);
        currentMagnetic = null;
      }
      if (
        currentTilt &&
        !(
          event.relatedTarget instanceof Node &&
          currentTilt.contains(event.relatedTarget)
        )
      ) {
        resetTilt(currentTilt);
        currentTilt = null;
      }
    };

    const handlePointerLeave = () => {
      setCursorMode(null);
      resetMagnetic(currentMagnetic);
      resetTilt(currentTilt);
      currentMagnetic = null;
      currentTilt = null;
      mouseX = -100;
      mouseY = -100;
    };

    const measure = () => {
      pageHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      marqueeElements.forEach((item) => {
        item.style.setProperty("--marquee-width", `${item.scrollWidth / 2}px`);
      });
      scrollDirty = true;
    };

    const handleScroll = () => {
      scrollDirty = true;
    };

    const updateMotionPreference = () => {
      cursorEnabled = finePointer.matches && !reducedMotion.matches;
      root.classList.toggle("interaction-cursor-on", cursorEnabled);
      if (!cursorEnabled) {
        handlePointerLeave();
        revealElements.forEach((item) => item.classList.add("motion-visible"));
      }
    };

    const renderFrame = (time: number) => {
      frameId = 0;
      const delta = Math.min(40, time - lastFrame);
      lastFrame = time;

      if (cursorEnabled) {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorDotRef.current?.style.setProperty(
          "transform",
          `translate3d(${(mouseX - 3).toFixed(2)}px, ${(mouseY - 3).toFixed(2)}px, 0)`,
        );
        cursorRingRef.current?.style.setProperty(
          "transform",
          `translate3d(${(ringX - 20).toFixed(2)}px, ${(ringY - 20).toFixed(2)}px, 0)`,
        );
      }

      if (scrollDirty && !reducedMotion.matches) {
        const scrollY = window.scrollY;
        progressRef.current?.style.setProperty(
          "transform",
          `scaleX(${clamp(scrollY / pageHeight, 0, 1)})`,
        );
        activeFloats.forEach((item) => {
          const speed = clamp(
            Number.parseFloat(item.dataset.floatSpeed ?? "0"),
            -0.18,
            0.18,
          );
          const rect = item.getBoundingClientRect();
          const distance =
            rect.top + rect.height / 2 - window.innerHeight / 2;
          item.style.setProperty(
            "--float-y",
            `${(distance * speed).toFixed(2)}px`,
          );
        });
        scrollDirty = false;
      }

      if (!reducedMotion.matches) {
        activeMarquees.forEach((item) => {
          const direction = item.dataset.marquee === "reverse" ? 1 : -1;
          const previous = Number.parseFloat(
            item.style.getPropertyValue("--marquee-position") || "0",
          );
          const halfWidth = Math.max(1, item.scrollWidth / 2);
          let next = previous + direction * delta * 0.025;
          if (next <= -halfWidth) next += halfWidth;
          if (next >= 0) next -= halfWidth;
          item.style.setProperty("--marquee-position", next.toFixed(2));
          item.style.setProperty(
            "transform",
            `translate3d(${next.toFixed(2)}px, 0, 0)`,
          );
        });
      }

      if (!document.hidden) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && frameId === 0) {
        lastFrame = performance.now();
        scrollDirty = true;
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
      { passive: true },
    );
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", updateMotionPreference);
    finePointer.addEventListener("change", updateMotionPreference);

    updateMotionPreference();
    measure();
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", updateMotionPreference);
      finePointer.removeEventListener("change", updateMotionPreference);
      revealObserver.disconnect();
      floatObserver.disconnect();
      marqueeObserver.disconnect();
      contentObserver.disconnect();
      root.classList.remove("motion-ready", "interaction-cursor-on");
      resetMagnetic(currentMagnetic);
      resetTilt(currentTilt);
    };
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        className="interaction-progress"
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className="interaction-cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        className="interaction-cursor-ring"
        aria-hidden="true"
      >
        <span ref={cursorLabelRef} />
      </div>
    </>
  );
}
