//data is stored in TreeNode
class TreeNode{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root=null;
    }
    insert(value){
        const newNode=new TreeNode(value);
        if(this.root===null){   //empty tree
            this.root=newNode;
        }
        else{
            this._insertNode(this.root, newNode);    //inserting new node into tree
        }
        this.visualize();  //update visualization after insertion
    }

//---------------------------------------------------- bst condition or logic for insertion-------------------------------------------------------------------
    _insertNode(node, newNode){        
        if(newNode.value<node.value){
            if(node.left===null){
                node.left=newNode;
            }
            else{
                this._insertNode(node.left, newNode);
            }
        }
        else{
            if(node.right===null){
                node.right=newNode;
            }
            else{
                this._insertNode(node.right, newNode);
            }
        } 
    }
// --------------------------------------------------------------visualization------------------------------------------------------
    visualize(){
        const treeContainer=document.getElementById("treeContainer"); 
        treeContainer.innerHTML='';   //clear previous visualization
        //reason for clear prev (sari nodes store h treeNode m): 
                //1. new node k addition se prev tree glt hogya
                //2. overlapping or duplicates value: prev va;ues k niche na lge vo niche lge(currently appropriate position pr)
                //3. efficiency: dom k liye easy hoga ki hm nayi nodes ki values k sath work kr rhe h
        
        if(!this.root){
            treeContainer.innerHTML='<p>Tree is empty!</p>'    
        }
        else{
            //creating visualization 
            const rootDiv=this._createNodeElement(this.root)
            treeContainer.appendChild(rootDiv)
        }
    }
    //nodes n childnodes ki visualization k liye responsible h respomsible for tree structure 
    _createNodeElement(node){
        //creating a node div: represent current node, contain node ki value
        const nodeDiv=document.createElement("div");

        //node circle: children node
        const nodeCircle=document.createElement("div");
        nodeCircle.textContent= node.value;   //nodecircle ki value user dekh pae ==>storing
        nodeDiv.appendChild(nodeCircle);

        //-------------------------------children container: left-right children----------------------------------------------
        const childrenDiv=document.createElement("div")  //: which helps to hold left right children

        //add left n right children
        if(node.left){
            const leftChild=this._createNodeElement(node.left)
            childrenDiv.appendChild(leftChild)
        }
        else{
            const placeholder=document.createElement("div")  //placeholder adding empty div==> balanced tree
            childrenDiv.appendChild(placeholder)
        }

        if(node.right){
            const rightChild=this._createNodeElement(node.right)
            childrenDiv.appendChild(rightChild)
        }
        else{
            const placeholder=document.createElement("div")
            childrenDiv.appendChild(placeholder)
        }
        nodeDiv.appendChild(childrenDiv);  //childrenDiv k pass position h ==> appending to nodeDiv(parent)
        return nodeDiv;
    }
}
const bst=new BinarySearchTree();
function insertNode(){
    const value=parseInt(document.getElementById("nodeValue").value)
    if(isNaN(value)){
        alert("juice pila do mausami ka thk gyi hu")
        return
    }
    bst.insert(value);
    document.getElementById("nodeValue").value=''  // Clear input so that next value to be entered
    //or we can get clarification of insertion successfully
}