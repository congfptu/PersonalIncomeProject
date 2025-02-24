# =======================
# Stage 1: Build
# =======================
FROM node:20-slim AS build
WORKDIR /app

# Copy file package.json và package-lock.json từ thư mục gốc của dự án
COPY package.json package-lock.json ./

# Cài đặt dependencies, bỏ qua optional dependencies (giúp tránh lỗi với @rollup/rollup-linux-x64-musl)
RUN npm install --omit=optional

# Cài đặt module bổ sung (nếu cần)
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

# Copy toàn bộ source code (ngoài những file/thư mục được liệt kê trong .dockerignore)
COPY . .

# Build dự án (Vite mặc định xuất ra thư mục 'dist')
RUN npm run build

# =======================
# Stage 2: Serve với Nginx
# =======================
FROM nginx:alpine

# Copy kết quả build từ stage 1 (thư mục 'dist') sang thư mục serve của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx tùy chỉnh (để xử lý route cho SPA)
# Bạn cần tạo file nginx.conf cùng cấp với Dockerfile với nội dung sau:
# 
#   server {
#       listen       80;
#       server_name  localhost;
#
#       root   /usr/share/nginx/html;
#       index  index.html;
#
#       location / {
#           try_files $uri $uri/ /index.html;
#       }
#   }
#
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]
