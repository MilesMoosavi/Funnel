# Bug: Scrollbar Animation Jump

## Status
**Pinned** - Deferred for future UX polish.

## Description
The chat input's scrollbar (positioned horizontally centered on the Airplane button) currently "pops" or jumps instantly whenever the textarea expands or shrinks (e.g., when typing newlines or deleting content). While the container transition is snappy, the native scrollbar track and thumb geometry snap to their new bounds without a smooth transition.

## Key Issues
1. **Visual Popping**: The scrollbar track length changes instantly, creating a distracting jump mid-animation.
2. **Sync Lag**: Even with `framer-motion` layout props, the scrollbar's internal layout frequently "beats" the animation or stays static until the animation finishes.

## Root Cause Hypothesis
The height is currently calculated and applied in a `useEffect` hook. This approach causes a discrete style change that `framer-motion` might not be able to interpolate smoothly for the *scrollbar properties* specifically, even if the element height tweens.

## Future Strategy
To solve this, we should:
- Use `useMotionValue` to manage the height.
- Use the `animate` function from `framer-motion` inside the resize effect to drive the height frame-by-frame on the GPU.
- Ensure the native scrollbar track relies on an interpolated height to force visual consistency during the spring transition.
