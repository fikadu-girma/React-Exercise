class myThreade extends Thread {
    public void run() {
        try {
            for (int i = 1; i <= 5; i++) {
                System.out.println(i);
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted: " + e.getMessage());
        }
    }
}

class threadDemo {
    public static void main(String args[]) {
        myThreade t1 = new myThreade();
        myThreade t2 = new myThreade();
        t1.start();
        t2.start();
    }
}