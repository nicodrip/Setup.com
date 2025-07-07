import time
import sys
from tkinter import Tk, Label, Button

class UpdateInstaller:
    def __init__(self, master):
        self.master = master
        self.master.title("SERUM 3.3.9 Update")
        self.master.geometry("400x200")
        
        self.label = Label(self.master, text="Installing Update...", font=("Helvetica", 14))
        self.label.pack(pady=20)
        
        self.progress = 0
        self.progress_label = Label(self.master, text=f"{self.progress}%", font=("Helvetica", 12))
        self.progress_label.pack(pady=10)

        self.install_button = Button(self.master, text="Start Installation", command=self.start_installation)
        self.install_button.pack(pady=10)

    def start_installation(self):
        self.install_button.config(state="disabled")  # Disable the button during installation
        self.simulate_installation()

    def simulate_installation(self):
        for i in range(1, 101):
            time.sleep(0.05)  # Simulate time taken for each step of the installation
            self.progress = i
            self.progress_label.config(text=f"{self.progress}%")
            self.master.update_idletasks()

        self.label.config(text="Installation Complete!")
        self.install_button.config(state="normal", text="Close", command=self.master.quit)

def run_installer():
    root = Tk()
    app = UpdateInstaller(root)
    root.mainloop()

if __name__ == "__main__":
    run_installer()
