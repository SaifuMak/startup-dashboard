'use client'
import { useEffect, useRef } from "react";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/classic.min.css";

export default function ColorThemePicker({ label, color, setColor }) {
  const pickrButtonRef = useRef(null); // 🔥 stable DOM element
  const pickrRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!pickrButtonRef.current || initializedRef.current) return;
    initializedRef.current = true;

    pickrRef.current = Pickr.create({
      el: pickrButtonRef.current,
      theme: "classic",
      default: color,
      useAsButton: true, //  To hide the pickr button
      i18n: {
        'btn:save': 'Choose',   // ✅ correct key
        'btn:cancel': 'Cancel'
      },

      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: false,
          input: true,
          save: true,
          cancel: false,
          clear: false,
        },
      },
    });

    // Only commit on SAVE
    pickrRef.current.on("save", (clr) => {
      const hex = clr.toHEXA().toString().toUpperCase();
      setColor(hex);
      pickrRef.current.hide();
    });

    return () => {
      pickrRef.current?.destroyAndRemove();
      pickrRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  // Sync external color changes
  useEffect(() => {
    pickrRef.current?.setColor(color);
  }, [color]);

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm text-gray-600 md:w-10">{label}</span>
      )}

      {/* This button is BOTH the UI and the Pickr anchor */}
      <button
        ref={pickrButtonRef}
        type="button"
        className="cursor-pointer rounded-full border border-slate-400 p-[2px]"
      >
        <div
          className="md:size-6 size-5 rounded-full"
          style={{ backgroundColor: color }}
        />
      </button>

      {/* Hex display */}
      <div className="bg-[#FBF9FF] border w-[80px] flex items-center justify-center rounded-md py-1.5 border-admin-violet-border">
        <span className="text-xs md:text-sm">{color}</span>
      </div>
    </div>
  );
}
