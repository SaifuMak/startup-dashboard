'use client'
import { motion } from 'framer-motion'

function UnsavedChangesBar({
  show = false,
  message = 'You have unsaved changes.',
  onSave,
  buttonLabel = 'Save',
  top = false,
  bottom = false
}) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        height: show ? 'auto' : 0,
        opacity: show ? 1 : 0
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`
        overflow-hidden
        ${top ? 'mt-12' : ''}
        ${bottom ? 'mb-12' : ''}
      `}
    >
      {/* Inner content */}
      <div className="flex w-full items-center justify-between">
        <p className="text-admin-violet">
          {message}
        </p>

        <button
          onClick={onSave}
          className="w-[90px] h-[33px] bg-admin-violet cursor-pointer text-white rounded-md"
        >
          {buttonLabel}
        </button>
      </div>
    </motion.div>
  )
}

export default UnsavedChangesBar
