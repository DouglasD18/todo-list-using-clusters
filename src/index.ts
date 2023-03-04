import cluster from "node:cluster";

const runPrimaryProcess = () => {
  console.log(`Primary ${process.pid} is running!`);
  
  for (let proc = 0; proc < 4; proc++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      cluster.fork();
      console.log(`Worker ${worker.process.pid} died!`)
    }
  })
}

const runWorkerProcess = async () => {
  await import("./server");
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
