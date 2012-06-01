# Harmonic movement
Simple harmonic motion is a type of movement commonly used to describe pendulums and springs. In this serie of experiments, I will try to show the concepts behind this type of motion, and understand the many different ways you can apply this in your games: from an animated health warning, to the motion of attacking enemy ships.

The heart of the machine is sine equation:

	x = amplitude * Math.sin(frequency * deg + offset_degrees) + offset_position

Playing with different values you can get several effects. In this experiment, all bullets have the same amplitude, no offsets, with minor change in frequency, resulting an hipnotic dance of particles.

You can view this demo [here](http://nobuti.com/harmonic). I hope you enjoy. Stay tuned for more experiments.