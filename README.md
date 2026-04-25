# K8s Foundation — Kubernetes Learning Website

Trang web học Kubernetes thực chiến, bao gồm 4 buổi học từ kiến trúc đến networking.

## Nội dung
- **Buổi 01**: Kiến trúc Kubernetes (control plane, worker node, luồng tạo Pod)
- **Buổi 02**: Deploy cluster với kubeadm, containerd, Calico
- **Buổi 03**: Workloads - Pod, Deployment, DaemonSet, StatefulSet, Job, CronJob
- **Buổi 04**: Networking & Service - ClusterIP, NodePort, Headless, ExternalName

## Deploy lên Vercel

### Cách 1: Vercel CLI (nhanh nhất)
```bash
npm install -g vercel
vercel --prod
```

### Cách 2: Import GitHub repo
1. Push code lên GitHub
2. Vào vercel.com → New Project → Import Git Repository
3. Vercel tự detect static site, bấm Deploy

### Cách 3: Drag & drop
1. Vào vercel.com
2. Kéo thả folder `public/` vào trang

## Cấu trúc file
```
k8s-course/
├── public/
│   └── index.html     ← Toàn bộ website (single file)
├── vercel.json        ← Cấu hình deploy
└── README.md
```
