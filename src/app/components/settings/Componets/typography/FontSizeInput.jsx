'use client'
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"

function FontSizeInput({
    value,
    min = 10,
    max = 200,
    step = 1,
    onChange
}) {
    const safeValue = Number.isNaN(Number(value)) ? 16 : Number(value)

    const clamp = (val) => Math.min(max, Math.max(min, val))

    return (
        <div className="relative h-fit w-24 px-2 py-2 text-sm flex items-center gap-1 border border-admin-violet-border rounded-md bg-admin-violet/5">

            <img
                src="/image/text-icon.svg"
                alt=""
                className="xl:size-5 size-5 object-contain"
            />

            {/* Input */}
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={safeValue}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    onChange(val === '' ? '' : Number(val))
                }}
                onBlur={() => {
                    onChange(clamp(safeValue || 16))
                }}
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full text-center bg-transparent  outline-admin-violet/30"
            />

            <span className="text-xs text-admin-grey-600">px</span>

            {/* Arrows */}
            <div className="flex flex-col leading-none ml-2">
                <button
                    type="button"
                    onClick={() => onChange(clamp(safeValue + step))}
                    disabled={safeValue >= max}
                    className="text-admin-violet disabled:opacity-40"
                >
                    <BiSolidUpArrow size={10} />
                </button>

                <button
                    type="button"
                    onClick={() => onChange(clamp(safeValue - step))}
                    disabled={safeValue <= min}
                    className="text-admin-violet disabled:opacity-40"
                >
                    <BiSolidDownArrow size={10} />
                </button>
            </div>
        </div>
    )
}

export default FontSizeInput
