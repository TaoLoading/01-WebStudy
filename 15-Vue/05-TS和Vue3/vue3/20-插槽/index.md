### 匿名插槽
1. 在子组件放置一个插槽
   ```
   <template>
       <div>
          <slot></slot>
       </div>
   </template
   ```
2. 父组件使用插槽
   ```
   <Dialog>
     <template v-slot>
       <div>2132</div>
     </template>
   </Dialog>

   ```

### 具名插槽
1. 具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中
   ```
   <div>
     <slot name="header"></slot>
     <slot></slot>

     <slot name="footer"></slot>
   </div>
   ```
2. 父组件使用需对应名称
   ```
   <Dialog>
     <template v-slot:header>
       <div>1</div>
     </template>
     <template v-slot:footer>
       <div>3</div>
     </template>
   </Dialog>

   可以简写为：
   <Dialog>
     <template #header>
       <div>1</div>
     </template>
     <template #footer>
       <div>3</div>
     </template>
   </Dialog>
   ```

### 作用域插槽
在子组件动态绑定参数，派发给父组件的slot去使用
1. 子组件中定义插槽和参数
   ```
   <div>
     <slot name="header"></slot>
     <div>
       <div v-for="item in 100">
         <slot :data="item"></slot>
       </div>
     </div>
     <slot name="footer"></slot>
   </div>
   ```
2. 父组件中拿到子组件的值并使用插槽
   ```
   <Dialog>
     <template #header>
       <div>1</div>
     </template>
     <template #default="{ data }">
       <div>{{ data }}</div>
     </template>
     <template #footer>
       <div>3</div>
     </template>
   </Dialog>
   ```
### 动态插槽
插槽名是动态的
   ```
   <Dialog>
     <template #[name]>
       <div>
         23
       </div>
     </template>
   </Dialog>
   ```
